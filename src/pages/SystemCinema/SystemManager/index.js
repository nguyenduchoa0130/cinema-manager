import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layHeThongRap, xoaHeThongRap } from "../../../redux/actions/QuanLyHeThongRapAction";

const SystemManager = () => {
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  console.log('listHeThongRap', listHeThongRap);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(layHeThongRap())
  },[dispatch])

  const { isShowing, toggle } = useModal();
  const [system, setSystem] = useState({
    systemName: "",
    logoSrc: {}
  });
  const removeToggle = (system) => {
    toggle();
    setSystem(system);
  }


  const renderRowData = () => {
    listHeThongRap?.systems?.sort((a, b) => {
      return a.id - b.id;
    })
    return listHeThongRap.systems?.map((system, index) => {
      return (
        <tr key={index}>
          <td>{system.id}</td>
          <td>{system.systemName}</td>
          <td>
            <img className={styles.thumbnail} src={system.logoSrc} alt="thumbnail" />
          </td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(system.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-he-thong-rap'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                dispatch({
                  type: 'DATA_EDIT_SYSTEM',
                  dataSystemEdit: system
                })
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
          <MDBBtn color="danger" onClick={() => {
            dispatch(xoaHeThongRap(system.id));
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default SystemManager;