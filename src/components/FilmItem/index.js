import React, { Fragment } from 'react';
import styles from './style.module.scss'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Link } from 'react-router-dom';


const FilmItem = ({ title, category, srcImg, path }) => {
    return (
        <Fragment>
            <Link path={path}>
                <MDBCard className={styles.cart}>
                    <div className={styles.cart_img}>
                        <MDBCardImage className="img-fluid" src={srcImg}
                            waves />
                        <div className={styles.layout_active}>
                            <Link to={path} className="btn-default btn Ripple-parent" >
                                Chi tiết
                            </Link>
                        </div>
                    </div>
                    
                    <MDBCardBody className = "ml-2 text-left">
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                            {category}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </Fragment>
    );
}

export default FilmItem;