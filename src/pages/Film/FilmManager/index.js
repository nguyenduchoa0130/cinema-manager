import React, { Fragment, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import Title from "../../../components/Tittle";
import { data } from "../../../util/dataTemplate";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useSelector } from "react-redux";


const FilmManager = () => {

  const {listFilm} = useSelector(state => state.QuanLyPhimReducer)
  const { isShowing, toggle } = useModal();
  const [film, setFilm] = useState({ 
    name: "",
    country: "",
    releaseYear: "",
    duration: "",
    actors: "",
    categoryId: 1,
    director: "",
    thumbnail: null,
    desc:"",
    poster: null
  });
  const removeToggle = (film) =>{
    toggle();
    setFilm(film);
  }

  const renderRowData = () => {
    return (
      data.map(item => {
        return (
          <tr>
            {Object.keys(item).slice(0,-2).map(keyName => {
              return (
                keyName === "thumbnail"
                  ? <td>
                        <img className={styles.thumbnail} src={item[keyName]} />
                    </td>
                  : <td> {item[keyName]}</td>)
            })}
            <td>
              <MDBBtn  color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(item.id) }} >
                <MDBIcon far icon="eye" />
              </MDBBtn>

              <Link to='/admin/cap-nhat-phim'>
                <MDBBtn color="success" size="sm" title="Chỉnh sửa"  >
                  <MDBIcon icon="pencil-ruler" />
                </MDBBtn>
              </Link>
              
              <MDBBtn color="danger" size="sm" title="Xóa" onClick={() => { removeToggle(item)}} className>
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
      <MDBCard>
        <MDBCardBody>
            <div className="text-right">
            <Link to="/admin/them-phim">
              <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
            </Link>
          </div>
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
              {renderRowData()}
            </MDBTableBody>
          </MDBTable>

        </MDBCardBody>
      </MDBCard>
      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          Bạn có muốn xóa phim  <strong>{film.name}</strong> có mã số là <strong>{film.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger">Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default FilmManager;