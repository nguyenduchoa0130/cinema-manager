
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBIcon, MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import FilmSlider from "../../components/FilmSlider";
import { useDispatch, useSelector } from "react-redux";
import { laydanhSachLichChieu, layDanhSachPhimDangCongChieu, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { Tabs } from 'antd';
import FilmSchedule from "../../components/FilmSchedule";
import _ from "lodash";
import moment from 'moment';

const { TabPane } = Tabs;

const Home = () => {
    const [schedule, setSchedule] = useState()
    const { listFilmDangCongChieu, listFilmSapCongChieu, listShowtimes } = useSelector(state => state.TrangChuReducer)
    // console.log(listFilmDangCongChieu);
    // console.log(listFilmSapCongChieu);
    console.log(listShowtimes);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachPhimDangCongChieu())
        dispatch(layDanhSachPhimSapCongChieu())
        dispatch(laydanhSachLichChieu())
    }, [])

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
    function getDateOfWeek(date) {
        let listDayOfWeek = [
            {
                dayOfWeek: 0,
                name: 'Chủ Nhật',
            },
            {
                dayOfWeek: 1,
                name: 'Thứ Hai',
            },
            {
                dayOfWeek: 2,
                name: 'Thứ Ba',
            },
            {
                dayOfWeek: 3,
                name: 'Thứ Tư',
            },
            {
                dayOfWeek: 4,
                name: 'Thứ Năm',
            },
            {
                dayOfWeek: 5,
                name: 'Thứ Sáu',
            },
            {
                dayOfWeek: 6,
                name: 'Thứ Bảy',
            },
        ];
        let dayOfWeek = new Date(date).getDay();
        let result = listDayOfWeek.find((item) => {
            return item.dayOfWeek == dayOfWeek;
        });
        return result.name;
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
    function getDetailFilm(listShowtimesRaw) {
        listShowtimesRaw.sort((a, b) => {
            return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
        });
        let listFilm = [];
        listShowtimesRaw.forEach((element) => {
            let arr = listFilm.filter((item) => {
                return element.Film.id == item.id;
            });
            if (!arr.length) {
                listFilm.push(element.Film);
            }
        });
        listFilm.forEach((film) => {
            film.shedule = [];
            let dates = listShowtimesRaw.filter((item) => {
                return item.Film.id == film.id;
            });
            dates = dates.map((date) => {
                let str = date.timeStart.split('T')[0];
                return new Date(str);
            });
            dates = [...new Set(dates)];
            dates.forEach((item) => {
                let { start, end } = getStartAndEndFromTimeStart(item.toJSON());
                let filter = listShowtimesRaw.filter((showtimes) => {
                    let timeStart = new Date(showtimes.timeStart);
                    return (
                        showtimes.Film.id == film.id && start.getTime() <= timeStart.getTime() && end.getTime() >= timeStart.getTime()
                    );
                });
                let times = filter.map((item) => {
                    return item.timeStart.split('T')[1];
                });
                film.shedule.push({
                    name: getDateOfWeek(item),
                    date: item,
                    times,
                });
            });
        });
        return listFilm;
    }

    const formatTime = (times) =>{
        return times.map(time=>{
            return time.substr(0,5);
        })
    }

    const renderFilmTabPane = (film) => {
        return(
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
                {   listShowtimes.map((item, index) => {
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
                                                        <TabPane className={styles.tab_schedule} key={index + 1}tab={renderFilmTabPane(showTime)} key={index + 1}>
                                                            {
                                                                showTime.shedule?.map((scheduleItem, index) => {
                                                                    console.log('scheduleItem :>> ', scheduleItem);
                                                                    return (
                                                                        <div className={styles.schedule_item}>
                                                                            <p>{moment(scheduleItem.date).format('DD/MM/YYYY')}</p>
                                                                            <FilmSchedule schedules={formatTime(scheduleItem.times)} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </TabPane>



                                                        // <MDBListGroup key={index + 1} className={styles.seat_plan}>
                                                        //     <MDBListGroupItem>
                                                        //         <MDBRow className="w-100 align-items-center">
                                                        //             <MDBCol lg="5" md="12">
                                                        //                 <strong className={styles.name} >
                                                        //                     {showTime.name}
                                                        //                 </strong>
                                                        //             </MDBCol>
                                                        //             <MDBCol lg="7" md="12">
                                                        //                 {
                                                        //                     showTime.shedule.map((scheduleItem,index) =>{
                                                        //                     {console.log('schedule :>> ', scheduleItem);}
                                                        //                     return <FilmSchedule schedules={scheduleItem.times} />
                                                        //                 })}

                                                        //             </MDBCol>
                                                        //         </MDBRow>
                                                        //     </MDBListGroupItem>
                                                        // </MDBListGroup>
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

    const renderTabCluster = (listCluster) => {
        return (
            <Tabs tabPosition="left" defaultActiveKey="4" centered className="mt-4 text-white">
                <TabPane tab={renderClusterTabItem({ name: "Rạp Q10", address: "123 Lý Thái Tổ, Q10" })} key="4">
                    {renderTabDay()}
                </TabPane>
                <TabPane tab={renderClusterTabItem({ name: "Rạp Q6", address: "456 An Dương Vương, Q6" })} key="5">
                    con 2
                </TabPane>
                <TabPane tab={renderClusterTabItem({ name: "Rạp Q5", address: "An Dương Vương, Q5" })} key="6">
                    con 3
                </TabPane>
            </Tabs>
        );
    }

    const renderTabDay = () => {
        return (
            <Tabs defaultActiveKey="1" centered className="mt-4 text-white">
                <TabPane tab="19-06" key="1">
                    {renderSeatPlan()}
                </TabPane>
                <TabPane tab="20-06" key="2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quo harum amet unde dolorum
                </TabPane>
                <TabPane tab="21-06" key="3">
                    21-06
                </TabPane>
                <TabPane tab="19-06" key="4">
                    {renderSeatPlan()}
                </TabPane>
                <TabPane tab="20-06" key="5">
                    20-06
                </TabPane>
                <TabPane tab="21-06" key="6">
                    21-06
                </TabPane><TabPane tab="21-06" key="7">
                    21-06
                </TabPane>
            </Tabs>
        );
    }

    const renderSeatPlan = () => {
        const schedules = ["10:40", "12:00", "14:20", "10:40", "12:00", "14:20"]
        return (
            <MDBListGroup className={styles.seat_plan}>
                <MDBListGroupItem>
                    <MDBRow className="w-100 align-items-center">
                        <MDBCol lg="5" md="12">
                            <strong className={styles.name} >
                                Quá nhanh quá nguy hiểm
                            </strong>
                        </MDBCol>
                        <MDBCol lg="7" md="12">
                            <FilmSchedule schedules={schedules} />
                        </MDBCol>
                    </MDBRow>
                </MDBListGroupItem>
            </MDBListGroup>
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
                                    <FilmSlider settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
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