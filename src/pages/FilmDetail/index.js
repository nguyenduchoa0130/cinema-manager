
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { layChiTietPhim, layLichChieu } from "../../redux/actions/ChiTietPhimAction/ChiTietPhimAction";
import Header from "../../components/Header";
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import { Tabs } from "antd";
import FilmSchedule from "../../components/FilmSchedule";
import moment from "moment";
import Title from "../../components/Title";
const FilmDetail = (props) => {
    const { dataFilmDetail, listShowtimesOfFilm } = useSelector(state => state.ChiTietPhimReducer)
    const dispatch = useDispatch()
    const maPhim = props.match.params.id;
    
    useEffect(() => {
        dispatch(layChiTietPhim(maPhim))
        dispatch(layLichChieu(maPhim))
    }, [dispatch, maPhim])

    const [isOpen, setOpen] = useState(false);
    const { TabPane } = Tabs;


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
                let dateCheck = new Date(showtimes.timeStart.split('T')[0]);
                let arr = dates.filter((date) => date.getTime() === dateCheck.getTime());
                if (!arr.length) {
                    dates.push(dateCheck);
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
        console.log('listShowtimesOfFilm :>> ', listShowtimesOfFilm);

        return (
            //Tab System  
            <Tabs defaultActiveKey="1" centered className="mt-4 text-white">
                {listShowtimesOfFilm.map((item, index) => {
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
                                                                            <TabPane  tab={<p>{moment(scheduleItem.date).format('DD/MM/YYYY')}</p>} key={index + 1} defaultActiveKey="1">
                                                                                <div className={styles.schedule_item}>
                                                                                    <FilmSchedule schedules={scheduleItem.times} />
                                                                                </div>
                                                                            </TabPane>
                                                                        )
                                                                    })
                                                                }
                                                            </Tabs>
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


    return (
        <>
            <Header />
            <div className={styles.wrapper_template}>
                <div style={{
                    backgroundImage: `url(${(dataFilmDetail.poster) || "https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606933569689aa9478944174_tay-du-ky-1.jpg"})`
                }}
                    className={styles.dynamic_page_header}
                >
                    <div className={styles.dynamic_header_overlay}>
                        <div className="container">
                            <div className={styles.header_content}>
                                <MDBRow className="justify-content-between">
                                    <MDBCol sm="12" md="4">
                                        <div style={{
                                            backgroundImage: `url(${(dataFilmDetail.thumbnail) || "../public/book.png"})`
                                        }}
                                            className={styles.header_thumbnail}
                                        >
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="12" md="7">
                                        <div className={styles.header_info}>
                                            <h1 className={cx(styles.header_title, "display-4")}>
                                                {dataFilmDetail.filmName}
                                            </h1>
                                            <div className={styles.header_short_descriptiop}>
                                                <p><strong>Quốc gia :</strong> {dataFilmDetail.country}</p>
                                                <p><strong>Năm xuất bản:</strong> {dataFilmDetail.releaseYear}</p>
                                                <p><strong>Diển viên:</strong> {dataFilmDetail.actors}</p>
                                                <p><strong>Đạo diển:</strong> {dataFilmDetail.director}</p>
                                                <p><strong>Thể loại:</strong> {dataFilmDetail.Category?.name}</p>
                                                <p><strong>Thời lượng:</strong> {dataFilmDetail.duration}</p>
                                                <p><strong>Trạng thái:</strong> {dataFilmDetail.StatusFilm?.name}</p>
                                            </div>
                                            <div className={styles.header_btn_group}>
                                                <MDBBtn color="primary" onClick={() => setOpen(true)}>Trailer</MDBBtn>
                                                <MDBBtn color="danger">Đặt vé</MDBBtn>
                                            </div>

                                        </div>

                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.descripion_film}>
                    <MDBContainer>
                        <h1>Nội dung phim</h1>
                        <p>{dataFilmDetail.desc}</p>
                        {/* <iframe width="100%" height="500px" src={dataFilmDetail.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    </MDBContainer>
                </div>
            </div>
            {/* <MDBModal className={styles.detailModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
                <iframe width="100%" height="500px" src={dataFilmDetail.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </MDBModal> */}
            <MDBContainer>
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
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="DDWFjTqnHbM" onClose={() => setOpen(false)} />
            </MDBContainer>
        </>


    );
};
export default FilmDetail;