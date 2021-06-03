import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import { systemTemplate } from "../../../util/dataTemplate/systemTemplate"

const SystemManager = () => {

  // const { listFilm } = useSelector(state => state.QuanLyPhimReducer)

  const dispatch = useDispatch()

  const { isShowing, toggle } = useModal();
  const [system, setSystem] = useState({
    id: "",
    systemName: "",
    logoSrc: "",
    logo: false
  });
  const removeToggle = (system) => {
    toggle();
    setSystem(system);
  }


  const renderRowData = () => {
    return systemTemplate.map((system, index) => {
      return (
        <tr key={index}>

          <td>{system.id}</td>
          <td>{system.systemName}</td>
          <td>
            <img className={styles.thumbnail} src={system.logoSrc} />
          </td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(system.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-he-thong-rap'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {

              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(system) }} >
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
      <Title text={"Quản lý hệ thống rạp"} />
      <MDBRow>
       <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <div className="text-right">
                <Link to="/admin/them-he-thong-rap">
                  <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
                </Link>
              </div>
              <MDBTable hover>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>Mã hệ thống</th>
                    <th>Tên hệ thống</th>
                    <th>Logo</th>
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
          Bạn có muốn xóa hệ thống này  <strong>{system.systemName}</strong> có mã số là <strong>{system.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" >Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default SystemManager;