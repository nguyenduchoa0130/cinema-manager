import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import {listCustomer} from "../../../util/constants/customerTemplate"

const CustomerManager = () => {

  // const { listFilm } = useSelector(state => state.QuanLyPhimReducer)

  const dispatch = useDispatch()
 
  const { isShowing, toggle } = useModal();
  const [customer, setCustomer] = useState({
    id: "",
    fullName: "",
    phone: "",
    email: "",
    address: ""
  });
  const removeToggle = (customer) => {
    toggle();
    setCustomer(customer);
  }


  const renderRowData = () => {
    return listCustomer.map((customer, index) => {
      return (
        <tr key={index}>
          {Object.keys(customer).map(keyName => {
              return ( <td> {customer[keyName]}</td>)
            })}
         
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(customer.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-khach-hang'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                
              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(customer) }} >
              <MDBIcon far icon="trash-alt" />
            </MDBBtn>

          </td>
        </tr>
      )
    }
    )
  }


  // const renderRowData = () => {
  //   listFilm.films?.sort((a, b) => {
  //     return a.id - b.id;
  //   })
  //   return listFilm.films?.map((film, index) => {
  //     return (
  //       <tr key={index}>
  //         {/* {Object.keys(item).slice(0,-2).map(keyName => {
  //             return (
  //               keyName === "thumbnail"
  //                 ? <td>
  //                       <img className={styles.thumbnail} src={item[keyName]} />
  //                   </td>
  //                 : <td> {item[keyName]}</td>)
  //           })} */}
  //         <td>{film.id}</td>
  //         <td>{film.filmName}</td>
  //         <td>{film.country}</td>
  //         <td>{film.releaseYear}</td>
  //         <td>{film.duration}</td>
  //         <td>{film.director}</td>
  //         <td>{film.actors}</td>
  //         <td>{film.Category.categoryName}</td>
  //         <td><img className={styles.thumbnail} src={film.thumbnail} /></td>
  //         <td>
  //           <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(film.id) }} >
  //             <MDBIcon far icon="eye" />
  //           </MDBBtn>

  //           <Link to='/admin/cap-nhat-phim'>
  //             <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
  //               dispatch({
  //                 type: 'DATA_FILM_EDIT',
  //                 dataFilm: film
  //               })
  //             }} >
  //               <MDBIcon icon="pencil-ruler" />
  //             </MDBBtn>
  //           </Link>

  //           <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(film) }} className>
  //             <MDBIcon far icon="trash-alt" />
  //           </MDBBtn>

  //         </td>
  //       </tr>
  //     )
  //   }
  //   )
  // }


  return (
    <Fragment>
      <Title text={"Quản lý khách hàng"} />
      <MDBCard>
        <MDBCardBody>
        <div className="text-right">
            <Link to="/admin/them-khach-hang">
              <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
            </Link>
          </div>
          <MDBTable hover>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Mã khách hàng</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {renderRowData()}
            </MDBTableBody>
          </MDBTable>

        </MDBCardBody>
      </MDBCard>
      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa khách hàng  <strong>{customer.fullName}</strong> có mã số là <strong>{customer.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" >Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default CustomerManager;