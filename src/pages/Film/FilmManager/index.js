import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhim, xoaPhim } from "../../../redux/actions/QuanLyPhimAction";


const FilmManager = () => {

  const { listFilm } = useSelector(state => state.QuanLyPhimReducer)
  console.log('listFilm', listFilm);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhim())
  }, [])
  const { isShowing, toggle } = useModal();
  const [film, setFilm] = useState({
    filmName: "",
    country: "",
    releaseYear: "",
    duration: "",
    actors: "",
    categoryId: 1,
    director: "",
    thumbnail: {},
    desc: "",
    poster: {}
  });
  const removeToggle = (film) => {
    toggle();
    setFilm(film);
  }
  console.log('film', film);

  const renderRowData = () => {
    listFilm.films?.sort((a, b) => {
      return a.id - b.id;
    })
    return listFilm.films?.map((film, index) => {
      return (
        <tr key={index}>
          {/* {Object.keys(item).slice(0,-2).map(keyName => {
              return (
                keyName === "thumbnail"
                  ? <td>
                        <img className={styles.thumbnail} src={item[keyName]} />
                    </td>
                  : <td> {item[keyName]}</td>)
            })} */}
          <td>{film.id}</td>
          <td>{film.filmName}</td>
          <td>{film.country}</td>
          <td>{film.releaseYear}</td>
          <td>{film.duration}</td>
          <td>{film.director}</td>
          <td>{film.actors}</td>
          <td>{film.Category.categoryName}</td>
          <td>{film.statusId}</td>
          <td>{film.premiere}</td>
          <td><img className={styles.thumbnail} src={film.thumbnail} /></td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { alert(film.id) }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>

            <Link to='/admin/cap-nhat-phim'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                dispatch({
                  type: 'DATA_FILM_EDIT',
                  dataFilm: film
                })
              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link>

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
                <th>Thể loại</th>
                <th>Trạng thái</th>
                <th>Ngày công chiếu</th>
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
          Bạn có muốn xóa phim  <strong>{film.filmName}</strong> có mã số là <strong>{film.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" onClick={() => {
            dispatch(xoaPhim(film.id))
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default FilmManager;