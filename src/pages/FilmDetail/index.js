
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { layChiTietPhim, layLichChieu } from "../../redux/actions/ChiTietPhimAction/ChiTietPhimAction";
import Header from "../../components/Header";
import ModalVideo from 'react-modal-video'
import Title from "../../components/Title";
import { getIdVideo } from "../../util";
import Footer from "../../components/Footer";
import Showtime from "../../components/Showtime";

const FilmDetail = (props) => {
    const { dataFilmDetail, listShowtimesOfFilm } = useSelector(state => state.ChiTietPhimReducer)
    const dispatch = useDispatch()
    const maPhim = props.match.params.id;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
        dispatch(layChiTietPhim(maPhim))
        dispatch(layLichChieu(maPhim))
    }, [dispatch, maPhim])

    const [isOpen, setOpen] = useState(false);



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
                                                <MDBBtn color="danger" href="#schedules">Đặt vé</MDBBtn>
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
            <MDBContainer id="schedules">
                <MDBRow className="mb-5">
                    <MDBCol>
                        <MDBAnimation type="fadeInRight">
                            <Title text={'Lịch chiếu'} className="mt-5 mb-4" />
                        </MDBAnimation>
                        <MDBAnimation type="fadeInLeft" delay="onScroll" data-mdb-animation-start="onScroll">
                            <Showtime dataShowtime={listShowtimesOfFilm} hiddenFilm={true}/>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={`${getIdVideo(dataFilmDetail.trailer)}`} onClose={() => setOpen(false)} />
            <Footer />
        </>


    );
};
export default FilmDetail;

// https://youtu.be/w2cEVsySsNI