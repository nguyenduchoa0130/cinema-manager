import React from "react";
import styles from './style.module.scss';
import cx from 'classnames';
import logo from './logo/logo.svg';
import { MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow } from "mdbreact";
import { Link } from "react-router-dom";

//
const Footer = () => {
  return (
    <footer>
      <MDBContainer className='py-2' >
        <MDBRow className='align-items-center'>
          <MDBCol md="3" xs="12">
            <img className={styles.logo} src={logo} alt="logo" />
          </MDBCol>
          <MDBCol md="6" xs="12" >
            <MDBListGroup className={styles.info}>
              <MDBListGroupItem className={styles.name_company}><strong>CÔNG TY CỔ PHẦN GIẢI TRÍ CINEJUN</strong></MDBListGroupItem>
              <MDBListGroupItem>Địa chỉ: <span className={styles.value}>227, Nguyễn Văn Cừ, phường 4, quận 5, Tp.HCM</span></MDBListGroupItem>
              <MDBListGroupItem>Email: <span className={styles.value}>cinejun@gmail.com</span></MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>
          <MDBCol md="3" xs="12" >
            <MDBListGroup className={styles.info}>
              <MDBListGroupItem>Liên hệ</MDBListGroupItem>
              <MDBListGroupItem><Link to='/gioi-thieu'>Giới thiệu</Link></MDBListGroupItem>
             <MDBListGroupItem > <Link to='/he-thong-rap'>Hệ thống rạp</Link></MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className={styles.bottom_footer}>
        Copyright © 2021 Fullphim.net. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
