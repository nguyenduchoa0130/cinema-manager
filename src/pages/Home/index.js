
import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBIcon, MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import FilmSlider from "../../components/FilmSlider";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimDangCongChieu, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { Tabs } from 'antd';
import FilmSchedule from "../../components/FilmSchedule";


const { TabPane } = Tabs;

const Home = () => {

    const { listFilmDangCongChieu, listFilmSapCongChieu } = useSelector(state => state.TrangChuReducer)
    console.log(listFilmDangCongChieu);
    console.log(listFilmSapCongChieu);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachPhimDangCongChieu())
        dispatch(layDanhSachPhimSapCongChieu())
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



    const renderTabSystem = (listSystem) => {
        return (
            <Tabs defaultActiveKey="1" centered className="mt-4 text-white">
                <TabPane tab={<div className={styles.cluster_thumbnail} style={{ backgroundImage: `url("https://lh3.googleusercontent.com/proxy/U6jG1Evp4KtSmtTuvZmliiWYQ4kpWEyZJnq_r3JfK3cK8Fbjr-40wyYh67OhH_a1scZ6AU-osgnRAv-bQaoO7kfZdZahIO00hz94uUGo-m2pwNxlCZb77m4J63JQHkFWJw")` }}>
                </div>} key="1">
                    {renderTabCluster()}
                </TabPane>
                <TabPane tab={<div className={styles.cluster_thumbnail} style={{ backgroundImage: `url("https://www.bhdstar.vn/wp-content/uploads/2019/06/BHDStar_Logo_Tron.png")` }}>
                </div>} key="2">
                    <FilmSlider settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
                </TabPane>
                <TabPane tab={<div className={styles.cluster_thumbnail} style={{ backgroundImage: `url("https://media.licdn.cn/dms/image/C560BAQG2JSNNKC-M7g/company-logo_200_200/0/1561753326625?e=2159024400&v=beta&t=TPo293PrmPD7JeJYH4p1DrYkjwhHlCK6B652oI_-NVU")` }}>
                </div>} key="3">
                    <FilmSlider settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
                </TabPane>
            </Tabs>
        );
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quo harum amet unde dolorum perferendis repellat mollitia ex odio modi. Beatae, similique suscipit? Eligendi eaque fugit ad tenetur, dicta ducimus nemo quod nihil maxime quisquam doloribus. Provident asperiores dignissimos, delectus rerum ipsam nostrum odio vel tempora repellat, mollitia doloribus dicta quos vero similique! Minima qui ipsa odit culpa perferendis ullam voluptatum cupiditate quis temporibus asperiores debitis est quisquam repellendus praesentium delectus, doloribus voluptatem sunt itaque distinctio amet? Est facilis repellat iusto cum sapiente ad quae tempora! Magni facilis recusandae corporis alias. Autem sit culpa laboriosam perferendis! Facere placeat quasi quae!
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