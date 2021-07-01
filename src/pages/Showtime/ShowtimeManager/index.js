import React, { Fragment, useEffect, useState } from "react";
import { MDBRow, MDBTableBody, MDBBtn, MDBCardBody, MDBCard, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon, MDBCol, MDBAlert } from "mdbreact";
import TitleBox from "../../../components/TittleBox";
import { useFormik } from 'formik';
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import TableShowtime from "../../../components/Table/TableShowTime";
import { useDispatch, useSelector } from "react-redux";
import { layLichChieu } from "../../../redux/actions/QuanLyLichChieuAction";
import { layHeThongRap } from "../../../redux/actions/QuanLyHeThongRapAction";
import { layCumRapTheoHethong } from "../../../redux/actions/QuanLyCumRapAction";


const ShowtimeManager = () => {
  const { listShowTime } = useSelector(state => state.QuanLyLichChieuReducer)
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  const { listCumRapTheoHeThong } = useSelector(state => state.QuanLyCumRapReducer)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layHeThongRap())
  }, [dispatch])

  const [isShowingDetails, setToggle] = useState(false);

  function toggleDetails() {
    setToggle(!isShowingDetails);
  }


  const detailToggle = (clusterId, filmId) => {
    setFilm({
      clusterId, filmId
    });
    toggleDetails();
  }

  const [film, setFilm] = useState({
    clusterId: '',
    filmId: ''
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      clusterId: '',
    },
    onSubmit: values => {
      dispatch(layLichChieu(values.clusterId))
    }
  })

  const rap_formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      systemId: '',
    },
  })

  useEffect(() => {
    if (rap_formik.values.systemId !== '') {
      dispatch(layCumRapTheoHethong(rap_formik.values.systemId))
    }
  }, [dispatch,rap_formik.values.systemId])



  const renderHeThongRap = () => {
    return listHeThongRap.systems?.map((system, index) => {
      return <Fragment>
        <option key={index} value={system.id}>{system.systemName}</option>
      </Fragment>

    })
  }
  const renderCumRap = () => {
    return listCumRapTheoHeThong.clusters?.map((cluster, index) => {
      return <Fragment>
        <option key={index} value={cluster.id}>{cluster.clusterName}</option>
      </Fragment>
    })
  }

  const renderRowData = () => {
    return listShowTime.showtimes?.map((film, index) => {
      return (
        <tr key={index}>
          <td>{film.Film?.id}</td>
          <td>{film.Film?.name}</td>
          <td>{film.Film?.duration}</td>
          <td>{film.Film?.StatusFilm?.name}</td>
          <td>{film.sum}</td>
          <td><img className={styles.thumbnail} src={film.Film?.thumbnail} alt={"thumbnail " + film.Film?.thumbnail} /></td>
          <td>
            <MDBBtn color="primary" size="sm" title="Xem chi tiết" onClick={() => {
              // dispatch(layChiTietLichChieu(film.clusterId, film.Film?.id))
              detailToggle(film.clusterId, film.Film?.id)
            }} >
              <MDBIcon far icon="eye" />
            </MDBBtn>
          </td>
        </tr>
      )
    }
    )
  }


  return (
    <Fragment>
      <TitleBox text={"Quản lý suất chiếu"} />
      <MDBCard>
        <MDBCardBody>
          <form onSubmit={formik.handleSubmit}>

            <MDBRow className="my-3 align-items-baseline" >
              <MDBCol>
                <MDBRow className="align-items-center">
                  <MDBCol md="3" className="mb-3">
                    <label className="grey-text">
                      Hệ thống
                    </label>
                  </MDBCol>
                  <MDBCol md="9" className="mb-3">
                    <select name="systemId" className="browser-default custom-select" onChange={rap_formik.handleChange}>
                      <option>Chọn hệ thống rạp</option>
                      {renderHeThongRap()}
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow className="align-items-center">
                  <MDBCol md="3" className="mb-3">
                    <label className="grey-text">
                      Cụm rạp
                    </label>
                  </MDBCol>
                  <MDBCol md="9" className="mb-3">
                    <select name="clusterId" className="browser-default custom-select" onChange={formik.handleChange}>
                      <option>Chọn cụm rạp</option>
                      {renderCumRap()}
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="2">
                <MDBBtn type="submit" color="success">Lọc</MDBBtn>
              </MDBCol>
              <MDBCol md="2" className="text-right">
                <Link to="/admin/them-suat-chieu">
                  <MDBBtn color="primary"> <MDBIcon icon="plus-circle" /> Thêm</MDBBtn>
                </Link>
              </MDBCol>
            </MDBRow>
          </form>

          {listShowTime.length !== 0 ? (
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
          ) : (
            <MDBAlert color="primary" >
              Không có dữ liệu, vui lòng chọn hệ thống và cụm rạp!
            </MDBAlert>
          )}

        </MDBCardBody>
      </MDBCard>

      <MDBModal className={styles.detailModal} size="fluid" isOpen={isShowingDetails} toggle={toggleDetails} centered>
        <MDBModalHeader toggle={toggleDetails}>Danh sách suất chiếu</MDBModalHeader>
        <MDBModalBody>
          <TableShowtime clusterId={film.clusterId} filmId={film.filmId} />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={toggleDetails}>Đóng</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  );
}

export default ShowtimeManager;