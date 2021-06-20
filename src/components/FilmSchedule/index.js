import React, { Fragment } from 'react';
import styles from './style.module.scss'


const listSchedules = ["10:40", "12:00", "14:20", "10:40", "12:00", "14:20"];
const FilmSchedule = ({schedules}) => {
    schedules = schedules?schedules:listSchedules;
    return (
        <div className={styles.film_schedule_box}>
            {schedules.map(item => {
                return (<div title={`Rạp:`} className={styles.item}>{item}
                
                </div>)
            })}
        </div>
    );
}

export default FilmSchedule;