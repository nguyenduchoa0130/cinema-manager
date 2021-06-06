import React, { Fragment, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol, MDBAlert } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import TableShowtime from "../../../components/Table/TableShowTime";


const ShowtimeManager = () => {

  const { isShowing, toggle } = useModal();
  const [isShowingDetails, setToggle] = useState(false);

  function toggleDetails() {
    setToggle(!isShowingDetails);
  }

  const [film, setFilm] = useState({
    filmId:"",
    filmName: "",
    duration: "",
    status: "",
    countShowTime: 0,
    thumbnail: {}
  });

  const listFilm = [{
    id:"1",
    filmName: "Abc",
    duration: "120",
    status: "Đang công chiếu",
    countShowTime:10,
    thumbnail: "https://cinejunsv.herokuapp.com/img/thumb/1"
  },
  {
    id:"2",
    filmName: "Abc",
    duration: "120",
    status: "Đang công chiếu",
    countShowTime:3,
    thumbnail: "https://cinejunsv.herokuapp.com/img/thumb/5"
  }]

  const removeToggle = (film) => {
    toggle();
    setFilm(film);
  }
  
  const detailToggle = (film) => { 
    setFilm(film);
    toggleDetails();
  }

  const renderRowData = () => {
    return listFilm?.map((film, index) => {
      return (
        <tr key={index}>
          <td>{film.id}</td>
          <td>{film.filmName}</td>
          <td>{film.duration}</td>
          <td>{film.status}</td>
          <td>{film.countShowTime}</td>
          <td><img className={styles.thumbnail} src={film.thumbnail}  alt={"thumbnail "+film.thumbnail}/></td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { detailToggle(film) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

             <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(film) }} className>
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
      <Title text={"Quản lý suất chiếu"} />
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="my-3 align-items-baseline" >
            <MDBCol>
              <MDBRow  className="align-items-center">
                <MDBCol md="3" className="mb-3">
                    <label className="grey-text">
                      Hệ thống
                    </label>
                  </MDBCol>
                  <MDBCol md="9" className="mb-3">
                    <select name="clusterId" className="browser-default custom-select" >
                      <option>Chọn hệ thống rạp</option>
                    </select>
                  </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
            <MDBRow  className="align-items-center">
                <MDBCol md="3" className="mb-3">
                    <label className="grey-text">
                      Cụm rạp
                    </label>
                  </MDBCol>
                  <MDBCol md="9" className="mb-3">
                    <select name="clusterId" className="browser-default custom-select" >
                      <option>Chọn cụm rạp</option>
                    </select>
                  </MDBCol>
              </MDBRow>
            </MDBCol>      
            <MDBCol md ="2">
              <MDBBtn color="success">Lọc</MDBBtn>
            </MDBCol>
            <MDBCol md ="2" className="text-right">
              <Link to="/admin/them-suat-chieu">
                <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>

          {listFilm.length?(
          <MDBTable hover>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>Mã số</th>
                <th>Tên</th>
                <th>Thời lượng</th>
                <th>Trạng thái</th>
                <th>Số suất chiếu</th>
                <th>Hình ảnh</th>
                <th>Thao tác</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {renderRowData()}
            </MDBTableBody>
          </MDBTable>
          ):(
            <MDBAlert color="primary" >
              Không có dữ liệu, vui lòng chọn hệ thống và cụm rạp!
            </MDBAlert>
          )}
        </MDBCardBody>
      </MDBCard>

      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa tất cả các suất chiếu của phim <strong> {film.filmName}</strong> ?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" onClick={() => {
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal className={styles.detailModal} size="fluid" isOpen={isShowingDetails} toggle={toggleDetails} centered>
        <MDBModalHeader toggle={toggleDetails}>Danh sách suất chiếu</MDBModalHeader>
        <MDBModalBody>
          <TableShowtime/>    
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggleDetails}>Đóng</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  );
}

export default ShowtimeManager;