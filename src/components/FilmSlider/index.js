import React from 'react';
import FilmItem from './../../components/FilmItem/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cx from 'classnames';
import styles from "./style.module.scss";

const FilmSlider = ({settings, dataSource,className }) => {
    // console.log(-settings);
    return (
        <Slider {...settings} className={cx(styles.listFilm,className)}>
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
            {
                dataSource?.map(film => {
                    return (
                        <div>
                            <div className={cx(styles.filmItem, "text-center")}>
                                <FilmItem info={film} />
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
    );
}

export default FilmSlider;