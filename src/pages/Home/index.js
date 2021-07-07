import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import FilmSlider from "../../components/FilmSlider";
import { useDispatch, useSelector } from "react-redux";
import { laydanhSachLichChieu, layDanhSachPhimDangCongChieu, layDanhSachPhimHot, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { Tabs } from 'antd';
import ModalVideo from 'react-modal-video';
import Showtime from "../../components/Showtime";
const { TabPane } = Tabs;


const Home = () => {
    // const { isOpen, toggle, modalContent ,setModalContent} = useModal();
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const toggle = () => {
        setIsOpen(!isOpen);
    }



    const { listFilmDangCongChieu, listFilmSapCongChieu, listFilmHot, listShowtimes } = useSelector(state => state.TrangChuReducer)

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
                                <TabPane tab="Đang chiếu" key="1">
                                    <FilmSlider toggle={toggle} setModalContent={setModalContent} settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
                                </TabPane>
                                <TabPane tab="Sắp chiếu" key="2">
                                    <FilmSlider settings={settings} dataSource={listFilmSapCongChieu?.films} className={styles.listFilm} />
                                </TabPane>
                                <TabPane tab="Phim hot" key="3">
                                    <FilmSlider settings={settings} dataSource={listFilmHot?.films} className={styles.listFilm} />
                                </TabPane>
                            </Tabs>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="mb-5" id="schedule">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'Lịch chiếu'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            <Showtime dataShowtime= {listShowtimes}/>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={modalContent} onClose={toggle} />
        </div>
    );
};

export default Home;
