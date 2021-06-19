
import React from "react";
import './carousel.scss';
import styles from "./style.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cx from "classnames";
const ListPoster = () => {
    //ok
    const options = {
        arrow: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        margin: 10,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        pauseOnHover: true,
        centerPadding: "150px",
        responsive: [
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: "0",
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: "0",
                }
            }
        ]
    };


    return (
        <div className={styles.posters}>
            {/* <OwlCarousel {...options} >
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://www.themoviedb.org//t/p/w1920_and_h800_multi_faces/ykElAtsOBoArgI1A8ATVH0MNve0.jpg" alt="" />
                    </div>
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/9Jmd1OumCjaXDkpllbSGi2EpJvl.jpg" alt="" />
                    </div>
                </OwlCarousel> */}

            <Slider {...options} dotsClass={cx(styles.dots, "slick-dots")} className={styles.posters}>
                <div className={cx(styles.poster_item, "item")}>
                    <img src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/9Jmd1OumCjaXDkpllbSGi2EpJvl.jpg" alt="" />
                </div>
                <div className={cx(styles.poster_item, "item")}>
                    <img src="https://www.themoviedb.org//t/p/w1920_and_h800_multi_faces/ykElAtsOBoArgI1A8ATVH0MNve0.jpg" alt="" />
                </div>
                <div className={cx(styles.poster_item, "item")}>
                    <img src="https://www.themoviedb.org//t/p/w1920_and_h800_multi_faces/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg" alt="" />
                </div>
                <div className={cx(styles.poster_item, "item")}>
                    <img src="https://themoviedb.org/t/p/w1920_and_h800_multi_faces/xXHZeb1yhJvnSHPzZDqee0zfMb6.jpg" alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default ListPoster;