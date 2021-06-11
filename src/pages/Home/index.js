
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import styles from "./style.module.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import cx from "classnames";
const Home = () => {
    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <MDBContainer>
                    <MDBRow className={styles.row_full_screen}>
                       
 
                            <OwlCarousel dots={false} height={50} items = {1} stagePadding = {300} autoplay={false} autoplayTimeout = {5000}className="owl-theme" loop margin={10} nav>
                                <div class={cx(styles.poster,"item")}>
                                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606c9150bfe72a0deb9b5351_banner-truong-luat-law-school-2021.jpg" />
                                </div>
                                <div class={cx(styles.poster,"item")}>
                                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606c9150bfe72a0deb9b5351_banner-truong-luat-law-school-2021.jpg" />
                                </div>
                                <div class={cx(styles.poster,"item")}>
                                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606c9150bfe72a0deb9b5351_banner-truong-luat-law-school-2021.jpg" />
                                </div>
                                <div class={cx(styles.poster,"item")}>
                                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606c9150bfe72a0deb9b5351_banner-truong-luat-law-school-2021.jpg" />
                                </div>
                                <div class={cx(styles.poster,"item")}>
                                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/606c9150bfe72a0deb9b5351_banner-truong-luat-law-school-2021.jpg" />
                                </div>
                            </OwlCarousel>
                       

                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};

export default Home;