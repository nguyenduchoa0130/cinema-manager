
import React from "react";
import { MDBContainer } from 'mdbreact';
import styles from "./style.module.scss";
import ListPoster from "../../components/ListPoster";
import Title from "../../components/Title";
import OwlCarousel from "react-owl-carousel";
import FilmItem from './../../components/FilmItem/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cx from 'classnames';
const Home = () => {

    function SlickArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, color:"blue!import" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: false,
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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div>
            <ListPoster />
            <MDBContainer>
                <Title text={'SẮP CHIẾU'} className="mt-5 mb-5" />

                <Slider {...settings}>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bạn Cùng Phòng Của Tôi Là Gumiho - My Roommate is a Gumiho (2021)" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                </Slider>



                <Title text={'ĐANG CHIẾU'} className="mt-5 mb-5" />
               
                <Slider {...settings}>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bạn Cùng Phòng Của Tôi Là Gumiho - My Roommate is a Gumiho (2021)" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={cx(styles.filmItem, "text-center")}>
                            <FilmItem title="Bố già" category="Hài" path="/" srcImg="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg" />
                        </div>
                    </div>
                </Slider>

            </MDBContainer>

        </div>
    );
};

export default Home;