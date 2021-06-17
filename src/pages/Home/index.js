
import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import FilmSlider from "../../components/FilmSlider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimDangCongChieu, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
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

    const filmData = [{
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }, {
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }, {
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }, {
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }, {
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }, {
        id: 1,
        filmName: 'Bố già',
        categoryName: 'Hài',
        thumbnail: 'https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg',
    }]

    return (
        <div>
            <ListPoster />
            <MDBContainer>

                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'SẮP CHIẾU'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            <div className="d-flex justify-content-end mr-3">
                                <Link to="/danh-sach-phim?status=SAP_CHIEU">Xem thêm <MDBIcon icon="angle-double-right" /></Link>
                            </div>


                            <FilmSlider settings={settings} dataSource={listFilmDangCongChieu?.films} className={styles.listFilm} />
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'Đang CHIẾU'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            <div className="d-flex justify-content-end mr-3">
                                <Link to="/danh-sach-phim?status=DANG_CHIEU">Xem thêm <MDBIcon icon="angle-double-right" /></Link>
                            </div>
                            <FilmSlider settings={settings} dataSource={listFilmSapCongChieu?.films} className={styles.listFilm} />
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </div>
    );
};

export default Home;