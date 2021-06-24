import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss'


const listSchedules = ["10:40", "12:00", "14:20", "10:40", "12:00", "14:20"];
const FilmSchedule = ({ schedules}) => {
    schedules = schedules ? schedules : listSchedules;
    console.log('schedules', schedules);
    return (
        <div className={styles.film_schedule_box}>
            {schedules.map(item => {
                return (
                    <Link to={`/dat-ve/chon-ghe/${item.id}`}>
                        <div title={`Rạp:`} className={styles.item}>{item.time}</div>
                    </Link>)
            })}
        </div>
    );
}

export default FilmSchedule;