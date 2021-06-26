
import React from "react";
import cx from 'classnames';
import styles from './style.module.scss';
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
const StatsBox = (props) => {
  return (
    <MDBCard className={cx(props.className,`bg-${props.color?props.color:"primary"}`)}>
      <MDBCardHeader className={styles.title_card}>
        {props.title}
      </MDBCardHeader>
      <MDBCardBody className={styles.body_card}>
        {props.value}
      </MDBCardBody>
    </MDBCard>
  );
}

export default StatsBox;