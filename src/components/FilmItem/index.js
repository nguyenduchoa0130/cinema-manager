import React, { Fragment, useState } from 'react';
import styles from './style.module.scss'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { layLichChieu } from '../../redux/actions/ChiTietPhimAction/ChiTietPhimAction';
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

const FilmItem = ({ info },props) => {
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false);
    return (
        <Fragment>
            <Link to={info.path}>
                <MDBCard className={styles.cart}>
                    <div className={styles.cart_img}>
                        <MDBCardImage className="img-fluid" src={info.thumbnail}
                            waves />
                        <div className={styles.layout_active}>
                            <MDBBtn onClick={() => setOpen(true)} className="btn-success btn Ripple-parent w-75" >
                                Trailer
                            </MDBBtn>
                            <Link to={`/chi-tiet-phim/${info.id}`} className="btn-danger btn Ripple-parent w-75" onClick={()=>{
                                dispatch(layLichChieu(info.id))
                            }}>
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
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={`${info.trailer?.split('/')[3]}`} onClose={() => setOpen(false)} />
            </Link>
        </Fragment>
    );
}

export default FilmItem;