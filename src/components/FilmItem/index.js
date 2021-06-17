import React, { Fragment } from 'react';
import styles from './style.module.scss'
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Link } from 'react-router-dom';


const FilmItem = ({ info }) => {
    return (
        <Fragment>
            <Link path={info.path}>
                <MDBCard className={styles.cart}>
                    <div className={styles.cart_img}>
                        <MDBCardImage className="img-fluid" src={info.thumbnail}
                            waves />
                        <div className={styles.layout_active}>
                            <Link to={'/chi-tiet-phim?id=' + info.id} className="btn-success btn Ripple-parent w-75" >
                                Chi tiết
                            </Link>
                            <Link to={'/dat-ve-phim?id=' + info.id} className="btn-danger btn Ripple-parent w-75" >
                                Đặt vé
                            </Link>
                        </div>
                    </div>

                    <MDBCardBody className="ml-2 text-left">
                        <Link to={'/chi-tiet-phim?id=' + info.id} >
                            <MDBCardTitle>{info.filmName}</MDBCardTitle>
                        </Link>
                        <MDBCardText>
                            {info.categoryName}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </Fragment>
    );
}

export default FilmItem;