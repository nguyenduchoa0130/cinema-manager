import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import TitleBox from "../../../components/TittleBox";
import useModal from "../../../util/useModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layCumRap, xoaCumRap } from "../../../redux/actions/QuanLyCumRapAction";

const ClusterManager = () => {
  const { isShowing, toggle } = useModal();

  const { listCumRap } = useSelector(state => state.QuanLyCumRapReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layCumRap())
  }, [dispatch])

  const [cluster, setCluster] = useState({
    clusterName: "",
    address: "",
    systemId: null
  });
  const removeToggle = (cluster) => {
    toggle();
    setCluster(cluster);
  }


  const renderRowData = () => {

    return listCumRap.clusters?.map((cluster, index) => {
      listCumRap?.clusters?.sort((a, b) => {
        return a.id - b.id;
      })
      return (
        <tr key={index}>
          <td>{cluster.id}</td>
          <td>{cluster.clusterName}</td>
          <td>{cluster.address}</td>
          <td>{cluster.CinemaSystem.name}</td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(cluster.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-cum-rap'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                dispatch({
                  type: 'DATA_EDIT_CLUSTER',
                  dataClusterEdit: cluster
                })
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
      <TitleBox text={"Quản lý cụm rạp"} />
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
                    <th>Mã cụm rạp</th>
                    <th>Tên cụm rạp</th>
                    <th>Địa chỉ</th>
                    <th>Hệ thống rạp</th>
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
     
      <MDBModal className="text-dark" size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa hệ thống này  <strong>{cluster.clusterName}</strong> có mã số là <strong>{cluster.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" onClick={() => {
            dispatch(xoaCumRap(cluster.id));
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default ClusterManager;