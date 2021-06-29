import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import FilmSlider from "../../components/FilmSlider";
import { useDispatch, useSelector } from "react-redux";
import { laydanhSachLichChieu, layDanhSachPhimDangCongChieu, layDanhSachPhimHot, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { Tabs } from 'antd';
import FilmSchedule from "../../components/FilmSchedule";
import moment from 'moment';

const { TabPane } = Tabs;

const Home = () => {
    const { listFilmDangCongChieu, listFilmSapCongChieu, listFilmHot, listShowtimes } = useSelector(state => state.TrangChuReducer)
    console.log(listFilmHot);
    // console.log(listFilmSapCongChieu);
    // console.log(listShowtimes);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachPhimDangCongChieu())
        dispatch(layDanhSachPhimSapCongChieu())
        dispatch(layDanhSachPhimHot())
        dispatch(laydanhSachLichChieu())
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: false,
        margin: 10,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        rows: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };
    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }
    function getStartAndEndFromTimeStart(timestart) {
        let start = new Date(timestart);
        let yearMonthDate = timestart.split('T')[0].split('-');
        let [y, M, d] = yearMonthDate;
        let hoursMinutes = timestart.split('T')[1].split(':');
        let [h, m] = hoursMinutes;
        h = 23 - +h + +h;
        m = 59 - +m + +m;
        let end = convertUTCDateToLocalDate(new Date(y, M - 1, d, h, m));
        return { start, end };
    }
    function getDetailFilm(listShowtimes) {
        listShowtimes.sort((a, b) => {
            return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
        });
        let listFilm = [];
        // Lấy danh sách phim
        listShowtimes.forEach((item) => {
            let arr = listFilm.filter((film) => {
                return film.id === item.Film.id;
            });
            if (!arr.length) {
                listFilm.push(item.Film);
            }
        });
        listFilm.forEach((item) => {
            item.schedule = [];
            let dates = [];
            // lấy danh sách ngày
            listShowtimes.forEach((showtimes) => {
                if (showtimes.Film.id === item.id) {
                    let dateCheck = new Date(showtimes.timeStart.split('T')[0]);
                    let arr = dates.filter((date) => {
                        return date.getTime() === dateCheck.getTime();
                    });
                    if (!arr.length) {
                        dates.push(dateCheck);
                    }
                }
            });
            // lấy các ca trong ngày
            dates.forEach((date) => {
                let times = [];
                let arr = listShowtimes.filter((showtimes) => {
                    let { start, end } = getStartAndEndFromTimeStart(date.toJSON());
                    let timeStart = new Date(showtimes.timeStart);
                    return (
                        showtimes.Film.id === item.id && start.getTime() <= timeStart.getTime() && timeStart.getTime() <= end.getTime()
                    );
                });
                times = arr.map((i) => {
                    return {
                        time: i.timeStart.split('T')[1].substr(0, 5),
                        id: i.id
                    }
                });
                item.schedule.push({
                    date: date.toJSON().split('T')[0],
                    times,
                });
            });
        });
        return listFilm;
    }
    const formatTime = (times) => {
        return times.map(time => {
            return time.time.substr(0, 5);
        })
    }
    const renderFilmTabPane = (film) => {
        return (
            <div className={styles.film_tab_pane}>
                <div className={styles.cluster_thumbnail} style={{ backgroundImage: `url(${film.thumbnail})` }}></div>
                <p>{film.name}</p>
            </div>

        )
    }
    const renderTabSystem = () => {
        console.log('listShowtimes :>> ', listShowtimes);

        return (
            //Tab System  
            <Tabs defaultActiveKey="1" centered className="mt-4 text-white">
                {listShowtimes.map((item, index) => {
                    return (
                        //Render item System         
                        <TabPane
                            tab={<div className={styles.cluster_thumbnail} style={{ backgroundImage: `url(${item.logoSrc})` }}> </div>}
                            key={index + 1}
                        >
                            {/*  Tab Clusters */}
                            <Tabs tabPosition="left" defaultActiveKey="1" centered className="mt-4 text-white">
                                {item.CinemaClusters?.map((cluster, index) => {
                                    //Render item Cluster     
                                    return (
                                        <TabPane tab={renderClusterTabItem({ name: `${cluster.name}`, address: `${cluster.address}` })} key={index + 1}>

                                            {/*  Tab Film */}
                                            <Tabs tabPosition="left" defaultActiveKey="1" centered className="mt-4 text-white">
                                                {console.log('getDetailFilm', getDetailFilm(cluster.Showtimes))}
                                                {getDetailFilm(cluster.Showtimes).map((showTime, index) => {

                                                    //Render item Film     
                                                    return (
                                                        <TabPane className={styles.tab_schedule} tab={renderFilmTabPane(showTime)} key={index + 1}>
                                                            <Tabs tabPosition="top" defaultActiveKey="1" centered className="mt-4 text-white">
                                                                {
                                                                    showTime.schedule?.map((scheduleItem, index) => {
                                                                        console.log('scheduleItem :>> ', scheduleItem);
                                                                        return (
                                                                            <TabPane tab={<p>{moment(scheduleItem.date).format('DD/MM/YYYY')}</p>} key={index + 1} defaultActiveKey="1">
                                                                                <div className={styles.schedule_item}>
                                                                                    <FilmSchedule schedules={scheduleItem.times} />
                                                                                </div>
                                                                            </TabPane>
                                                                        )
                                                                    })
                                                                }
                                                            </Tabs>
                                                        </TabPane>
                                                    )
                                                })
                                                }
                                            </Tabs>

                                        </TabPane>
                                    )
                                })
                                }
                            </Tabs>
                        </TabPane>
                    )
                })
                }
            </Tabs >
        )
    }
    const renderClusterTabItem = (cluster) => {
        return (
            <div className="d-flex ">
                {/* <MDBBtn size="sm" rounded color="secondary" className="rounded-circle px-3 mr-3">
                    <MDBIcon icon="map-marker-alt" />
                </MDBBtn> */}
                <div className="info_cluster">
                    <strong className={styles.cluster_name}>
                        {cluster.name}
                    </strong>
                    <p className={styles.cluster_address}>
                        {cluster.address}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ListPoster />
            <MDBContainer>
                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'danh sách phim'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            <Tabs defaultActiveKey="1" centered className="mt-4 text-white">
                                <TabPane tab="Sắp chiếu" key="1">
                                    <FilmSlider settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
                                </TabPane>
                                <TabPane tab="Đang chiếu" key="2">
                                    <FilmSlider settings={settings} dataSource={listFilmSapCongChieu?.films} className={styles.listFilm} />
                                </TabPane>
                                <TabPane tab="Phim hot" key="3">
                                    <FilmSlider settings={settings} dataSource={listFilmHot?.films} className={styles.listFilm} />
                                </TabPane>
                            </Tabs>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'Lịch chiếu'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            {renderTabSystem()}
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </div>
    );
};

export default Home;
