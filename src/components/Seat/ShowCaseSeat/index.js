import React from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
const  ShowCaseSeat = ({className}) => {
    return (
      <ul className={cx(styles.show_case,className)}>
        <li>
          <span className={styles.seat} /> <small>Trống</small>
        </li>
        <li>
          <span className={cx(styles.seat,styles.selected)} /> <small>Đã chọn</small>
        </li>
        <li>
          <span className={cx(styles.seat,styles.occupied)}/> <small>Không thể chọn</small>
        </li>
      </ul>
    )
  }
export default ShowCaseSeat;