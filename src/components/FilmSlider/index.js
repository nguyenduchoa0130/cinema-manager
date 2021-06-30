import React from 'react';
import FilmItem from './../../components/FilmItem/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cx from 'classnames';
import styles from "./style.module.scss";

const FilmSlider = (props) => {
    const {settings, dataSource, className,toggle,setModalContent} = props;
    return (
        <Slider {...settings} className={cx(styles.listFilm,className)}>
            {
                dataSource?.map((film,index) => {
                    return (
                        <div key={index}>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem toggle={toggle} setModalContent ={setModalContent} info={film} />
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
    );
}

export default FilmSlider;