import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol } from "mdbreact";
import Title from "../../../components/Tittle";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhim, xoaPhim } from "../../../redux/actions/QuanLyPhimAction";


const FilmManager = () => {

  const { listFilm } = useSelector(state => state.QuanLyPhimReducer)
  // console.log('listFilm', listFilm);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhim())
  })
  const { isShowing, toggle } = useModal();
  const [isShowingDetails, setToggle] = useState(false);

  function toggleDetails() {
    setToggle(!isShowingDetails);
  }

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

  const detailToggle = (film) => {
    setFilm(film);
    toggleDetails();
  }

  const renderRowData = () => {
    listFilm?.films?.sort((a, b) => {
      return a.id - b.id;
    })
    return listFilm?.films?.map((film, index) => {
      return (
        <tr key={index}>
          <td>{film.id}</td>
          <td>{film.filmName}</td>
          <td>{film.country}</td>
          <td>{film.releaseYear}</td>
          <td>{film.duration}</td>
          <td>{film['Category.name']}</td>
          <td>{film[['StatusFilm.name']]}</td>
          <td>{film.premiere.slice(0, 10)}</td>
          <td><img className={styles.thumbnail} src={film.thumbnail} alt={"thumbnail " + film.thumbnail} /></td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => { detailToggle(film) }} >
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
          Bạn có muốn xóa phim <strong> {film.filmName}</strong> có mã số là <strong>{film.id}</strong>?
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggle}>Hủy</MDBBtn>
          <MDBBtn color="danger" onClick={() => {
            dispatch(xoaPhim(film.id));
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal className={styles.removeModal} size="lg" isOpen={isShowingDetails} toggle={toggleDetails} centered>
        <MDBModalHeader toggle={toggleDetails}>Xác nhận</MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <div className="w-100">

            </div>
            {/* <img className="w-100" src={film.thumbnail} alt="" /> */}
          </MDBRow>
          <MDBRow>

            <MDBCol>
              <img className="w-100 mx-3" src={film.thumbnail} alt="" />
            </MDBCol>
            <MDBCol>
              <p><strong>Tên phim :</strong> {film.filmName}</p>
              <p><strong>Quốc gia :</strong> {film.country}</p>
              <p><strong>Năm xuất bản:</strong> {film.releaseYear}</p>
              <p><strong>Diển viên:</strong> {film.actors}</p>
              <p><strong>Đạo diển:</strong> {film.director}</p>
              <p><strong>Thể loại:</strong> {film['Category.name']}</p>
              <p><strong>hời lượng:</strong> {film.duration}</p>
              <p><strong>rạng thái:</strong> {film[['StatusFilm.name']]}</p>
              <p><strong>Nội dung:</strong> {film.desc}</p>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <iframe width="100%" height="500px" src={film.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </MDBRow>

        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggleDetails}>Đóng</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  );
}

export default FilmManager;