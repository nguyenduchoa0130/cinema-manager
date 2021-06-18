import React, { Fragment } from 'react';
import styles from './style.module.scss'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import { Link, NavLink } from 'react-router-dom';



const FilmItem = ({ info },props) => {
    return (
        <Fragment>
            <Link path={info.path}>
                <MDBCard className={styles.cart}>
                    <div className={styles.cart_img}>
                        <MDBCardImage className="img-fluid" src={info.thumbnail}
                            waves />
                        <div className={styles.layout_active}>
                            <MDBBtn className="btn-success btn Ripple-parent w-75" >
                                Trailer
                            </MDBBtn>
                            <Link to={`/chi-tiet-phim/${info.id}`} className="btn-danger btn Ripple-parent w-75" >
                                Đặt vé
                            </Link>
                        </div>
                    </div>

                    <MDBCardBody className="ml-2 text-left">
                        <Link to={`/chi-tiet-phim/${info.id}`} >
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