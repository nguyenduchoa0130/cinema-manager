
import React from "react";
import { MDBCard, MDBCardBody } from 'mdbreact';
import cx from 'classnames';
import styles from "./style.module.scss";
const Title = ({text,className}) => {
  return (
    <MDBCard className="my-3">
      <MDBCardBody  className="d-flex align-items-center justify-content-center">
          <h3 className={cx("mb-0",className)}>{text}</h3>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Title;