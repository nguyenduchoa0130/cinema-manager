
import React from "react";
import './carousel.scss';
import styles from "./style.module.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import cx from "classnames";
const ListPoster = () => {


    const options = {
        loop: true,
        autoplayTimeout: 3000,
        autoplay: false,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    }

    return (
            <div className={styles.posters}>
                <OwlCarousel {...options} >
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://media.lottecinemavn.com/Media/WebAdmin/9aa9607cd0844a1a863d14c61d8f2ef1.jpg" alt="" />
                    </div>
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://media.lottecinemavn.com/Media/WebAdmin/9b5494601af14d32ba26d310819b8c8a.jpg" alt="" />
                    </div>
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://media.lottecinemavn.com/Media/WebAdmin/3c0d96cf2cf24aec91f9247d7ee90026.jpg" alt="" />
                    </div>
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://media.lottecinemavn.com/Media/WebAdmin/bcd3b8683d0b4a518a5f9a6e6d73d666.png" alt="" />
                    </div>
                    <div className={cx(styles.poster_item, "item")}>
                        <img src="https://media.lottecinemavn.com/Media/WebAdmin/9aa9607cd0844a1a863d14c61d8f2ef1.jpg" alt="" />
                    </div>
                </OwlCarousel>
            </div>
    );
};

export default ListPoster;