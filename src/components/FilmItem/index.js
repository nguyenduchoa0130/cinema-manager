import React from 'react';
import styles from './style.module.scss'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { layLichChieu } from '../../redux/actions/ChiTietPhimAction/ChiTietPhimAction';
import { getIdVideo } from '../../util';


const FilmItem = (props) => {
    const {setModalContent,toggle} = props;
    const dispatch = useDispatch();
   
    const showTrailer = () =>{
        setModalContent(getIdVideo(info.trailer));
        toggle();
    }
    const info=props.info;
    return (
        <>
            <Link to={info.path}>
                <MDBCard className={styles.cart}>
                   {info.numberOfTickets?( <div className={styles.badge}>HOT</div>):null}
                    <div className={styles.cart_img}>
                        <MDBCardImage className="img-fluid" src={info.thumbnail}
                            waves />
                        <div className={styles.layout_active}>
                            <MDBBtn onClick={showTrailer} className="btn-success btn Ripple-parent w-75" >
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
                            <p>{info["Category.name"]}</p>
                            {info.numberOfTickets?(
                                <p><strong>Lượt đặt: </strong>{info.numberOfTickets}</p>
                            ):null}
                            
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </>
    );
}

export default FilmItem;