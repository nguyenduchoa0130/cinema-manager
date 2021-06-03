import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import { cinemaTemplate } from "../../../util/dataTemplate/cinemaTemplate"

const CinemaManager = () => {


  const { isShowing, toggle } = useModal();
  const [cinema, setCinema] = useState({
    id: "",
    cinemaName: "",
    address:  "",
    col: -1,
    row: -1,
    clusterId:"",
  });
  const removeToggle = (cinema) => {
    toggle();
    setCinema(cinema);
  }


  const renderRowData = () => {
    return cinemaTemplate.map((cinema, index) => {
      return (
        <tr key={index}>

          <td>{cinema.id}</td>
          <td>{cinema.cinemaName}</td>
          <td>{cinema.clusterId}</td>
          <td>{cinema.col * cinema.row}</td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(cinema.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-rap'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {

              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(cinema) }} >
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
      <Title text={"Quản lý rạp"} />
      <MDBRow>
       <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <div className="text-right">
                <Link to="/admin/them-rap">
                  <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
                </Link>
              </div>
              <MDBTable hover>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>Mã rạp</th>
                    <th>Tên rạp</th>
                    <th>Cụm rạp</th>
                    <th>Số ghế</th>
                    <th>Thao tác</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {renderRowData()}
                </MDBTableBody>
              </MDBTable>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa hệ thống này  <strong>{cinema.cinemaName}</strong> có mã số là <strong>{cinema.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" >Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default CinemaManager;