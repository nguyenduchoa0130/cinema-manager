import React, { Fragment, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import Title from "../../components/Tittle";
import { data } from "../../util/dataTemplate";
import AddFilmModal from "../../components/AddFilmModal";
// import AddFilmModal from "~/components/AddFilmModal";
import useModal from "../../util/useModal";
import styles from "./style.module.scss";


const FilmManager = () => {
  const { isShowing, toggle } = useModal();


  const addAction = () => {
    return (
      data.map(item => {
        return (
          <tr>
            {Object.keys(item).map(keyName => {
              return (
                keyName === "thumbnail"
                  ? <td> <img className={styles.thumbnail} src={item[keyName]} /> </td>
                  : <td> {item[keyName]}</td>)
            })}
            <td>
              <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => {alert(item.id) }} >
                  <MDBIcon far icon="eye" />
              </MDBBtn>
              <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { alert(item.id) }} >
                <MDBIcon far icon="trash-alt" />
              </MDBBtn>
            </td>
          </tr>
        )
      }
      )
    )
  }


  return (
    <Fragment>
      <Title text={"Quản lý phim"} />
      <div className="text-right">
        <MDBBtn color="primary" onClick={toggle} > <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
      </div>

      <MDBCard>
        <MDBCardBody>
          <MDBTable hover>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Mã số</th>
                <th>Tên</th>
                <th>Quốc gia sản xuất</th>
                <th>Năm phát hành</th>
                <th>Thời lượng</th>
                <th>Đạo diển</th>
                <th>Diển viên</th>
                <th>Thể loại</th>
                <th>Hình ảnh</th>
                <th>Thao tác</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {addAction()}
            </MDBTableBody>
          </MDBTable>

        </MDBCardBody>
      </MDBCard>
      {/* 
      <MDBModal isOpen={toggleModal} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          <AddFilmModal/>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal> */}
      <AddFilmModal
        isShowing={isShowing}
        hide={toggle}
      />
    </Fragment>
  );
}

export default FilmManager;