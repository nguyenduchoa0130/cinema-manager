import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachNguoiDung } from "../../../redux/actions/QuanLyNguoiDungAction";

const CustomerManager = () => {

  const { listUser } = useSelector(state => state.QuanLyNguoiDungReducer)
  // console.log('listUser',listUser);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(layDanhSachNguoiDung())
  }, [])

  const { isShowing, toggle } = useModal();
  const [customer, setCustomer] = useState({
    id: "",
    fullName: "",
    phone: "",
    email: "",
    password: ""
  });
  const removeToggle = (customer) => {
    toggle();
    setCustomer(customer);
  }

  const renderRowData = () => {
    listUser.users?.sort((a, b) => {
      return a.id - b.id;
    })
    return listUser.users?.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.fullName}</td>
          <td>{user.phone}</td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert() }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-khach-hang'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                dispatch({
                  type: 'DATA_USER_EDIT',
                  dataUser: user
                })
              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(user) }} className>
              <MDBIcon far icon="trash-alt" />
            </MDBBtn>

          </td>
        </tr>
      )
    }
    )
  }


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
                <th>Mã người dùng</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
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