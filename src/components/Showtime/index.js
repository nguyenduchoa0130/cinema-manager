import React from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
import { Tabs } from 'antd';
import moment from 'moment';
import FilmSchedule from '../FilmSchedule';
const { TabPane } = Tabs;

const Showtime = (props) => {
    const { dataShowtime, className, hiddenFilm } = props;
    const listShowtimes = dataShowtime;

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

    const renderFilmTabPane = (film) => {
        return (
            <div className={styles.film_item}>
                <div className={styles.film_thumbnail} style={{ backgroundImage: `url(${film.thumbnail})` }}></div>
                <p>{film.name}</p>
            </div>

        )
    }


    const renderClusterTabItem = (cluster) => {
        return (
            <div className={cx(styles.cluster_item)}>
                {/* <MDBBtn size="sm" rounded color="secondary" className="rounded-circle px-3 mr-3">
                    <MDBIcon icon="map-marker-alt" />
                </MDBBtn> */}
                <div className={styles.info_cluster}>
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
        <Tabs defaultActiveKey="1" centered className={cx(className, "mt-4 text-white")}>
            {listShowtimes.map((item, index) => {
                return (
                    //Render item System         
                    <TabPane
                        tab={<div className={styles.cluster_thumbnail} style={{ backgroundImage: `url(${item.logoSrc})` }}> </div>}
                        key={index + 1}
                    >
                        {/*  Tab Clusters */}
                        <Tabs tabPosition="left" defaultActiveKey="1" centered className={cx(styles.tab_Clusters, "mt-2 text-white")} tabBarStyle={{ maxWidth: "30%" }}>
                            {item.CinemaClusters?.map((cluster, index) => {
                                //Render item Cluster     
                                return (
                                    <TabPane tab={renderClusterTabItem({ name: `${cluster.name}`, address: `${cluster.address}` })} key={index + 1}>
                                        {hiddenFilm ?
                                            getDetailFilm(cluster.Showtimes).map((showTime, index) => {
                                                //Render item Film     
                                                return (
                                                    showTime.schedule?.map((scheduleItem, index) => {
                                                        return (
                                                            <>
                                                                <p className={styles.date}>{moment(scheduleItem.date).format('DD/MM/YYYY')}</p>
                                                                <div className={styles.schedule_item}>
                                                                    <FilmSchedule schedules={scheduleItem.times} />
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                )
                                            }
                                        ): (
                                        <Tabs
                                            defaultActiveKey="1"
                                            centered
                                            className={cx(styles.tab_Clusters, "mt-2 text-white")}
                                        >
                                            {getDetailFilm(cluster.Showtimes).map((showTime, index) => {
                                                //Render item Film     
                                                return (
                                                    <TabPane className={styles.tab_schedule} tab={renderFilmTabPane(showTime)} key={index + 1}>
                                                        {
                                                            showTime.schedule?.map((scheduleItem, index) => {
                                                                return (
                                                                    <>
                                                                        <p className={styles.date}>{moment(scheduleItem.date).format('DD/MM/YYYY')}</p>
                                                                        <div className={styles.schedule_item}>
                                                                            <FilmSchedule schedules={scheduleItem.times} />
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </TabPane>
                                                )
                                            })
                                            }
                                        </Tabs>

                                        )}
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

export default Showtime;