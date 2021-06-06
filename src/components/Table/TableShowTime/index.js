import React, { Fragment, useState } from "react";
import {  MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";


const TableShowtime = () => {

  const { isShowing, toggle } = useModal();

  const [showTime, setshowTime] = useState({
    id:"",
    filmName: "",
    clusterName: "",
    cinameName: "",
    timeStart: "",
    priceTicket: 95000
  });

  const listShowTime = [
    {
        id:"1",
        filmName: "Âm Dương Mỹ Nhân Quan - A Sleeping Princess",
        clusterName: "CGV Sư Vạn Hạnh",
        cinameName: "Rạp 1",
        timeStart: "06/06/2021 12:15",
        priceTicket: 95000
    },
    {
        id:"2",
        filmName: "Âm Dương Mỹ Nhân Quan - A Sleeping Princess",
        clusterName: "CGV Sư Vạn Hạnh",
        cinameName: "Rạp 1",
        timeStart: "06/06/2021 12:15",
        priceTicket: 95000
    }
]

  const removeToggle = (showTime) => {
    toggle();
    setshowTime(showTime);
  }

  const renderRowData = () => {
    console.log('listShowTime :>> ', listShowTime);
    return listShowTime?.map((showTime, index) => {
      return (
        <tr key={index}>
          <td>{showTime.id}</td>
          <td>{showTime.filmName}</td>
          <td>{showTime.clusterName}</td>
          <td>{showTime.cinameName}</td>
          <td>{showTime.timeStart}</td>
          <td>{showTime.priceTicket}đ</td>
          <td>
            <Link to='/admin/cap-nhat-suat-chieu'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
               
              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

            <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(showTime) }} className>
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
      <MDBTable hover>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Mã suất chiếu</th>
                <th>Tên phim</th>
                <th>Cụm rạp</th>
                <th>Rạp</th>
                <th>Thời gian bắt đầu</th>
                <th>Giá vé</th>
                <th>Thao tác</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {renderRowData()}
            </MDBTableBody>
          </MDBTable>


      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa suất chiếu <strong> {showTime.id}</strong> phim <strong> {showTime.filmName}</strong> vào lúc 
          <strong> {showTime.timeStart}</strong> ở rạp <strong>{showTime.cinameName}</strong> của cụm 
          <strong>{showTime.clusterName}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" onClick={() => {
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default TableShowtime;