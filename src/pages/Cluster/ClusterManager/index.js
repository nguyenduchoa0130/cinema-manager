import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import { clusterTemplate } from "../../../util/dataTemplate/clusterTemplate"

const ClusterManager = () => {



  const { isShowing, toggle } = useModal();
  const [cluster, setCluster] = useState({
    id: "",
    clusterName: "",
    address: "",
    systemId:0
  });
  const removeToggle = (cluster) => {
    toggle();
    setCluster(cluster);
  }


  const renderRowData = () => {
    return clusterTemplate.map((cluster, index) => {
      return (
        <tr key={index}>

          <td>{cluster.id}</td>
          <td>{cluster.clusterName}</td>
          <td>{cluster.address}</td>
          <td>{cluster.clusterName}</td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(cluster.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-cum-rap'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {

              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(cluster) }} >
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
      <Title text={"Quản lý cụm rạp"} />
      <MDBRow>
       <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <div className="text-right">
                <Link to="/admin/them-cum-rap">
                  <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
                </Link>
              </div>
              <MDBTable hover>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>Mã cụm</th>
                    <th>Tên cụm</th>
                    <th>Hệ thống</th>
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
        </MDBCol>
      </MDBRow>
      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa hệ thống này  <strong>{cluster.clusterName}</strong> có mã số là <strong>{cluster.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" >Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default ClusterManager;