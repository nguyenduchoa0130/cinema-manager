
import React from "react";
import cx from 'classnames';
import styles from './style.module.scss';
const Title = ({text,className}) => {
  return (
    <div className={cx(className,"text-center mb-0")}>
          <span className={styles.title}>{text}</span>
    </div>
  );
}

export default Title;