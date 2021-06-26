import React, { Fragment, useEffect, useState } from "react";
import { MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBTable, MDBTableHead, MDBIcon } from "mdbreact";
import useModal from "../../../util/useModal";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { layChiTietLichChieu, xoaLichChieu } from "../../../redux/actions/QuanLyLichChieuAction";


const TableShowtime = (props) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layChiTietLichChieu(props.clusterId, props.filmId))
  }, [dispatch, props.clusterId, props.filmId])

  const { listDetailShowTime } = useSelector(state => state.QuanLyLichChieuReducer)
  console.log('listDetailShowTime', listDetailShowTime);
  const { isShowing, toggle } = useModal();

  const [showTime, setshowTime] = useState({
    id: "",
    filmName: "",
    clusterName: "",
    cinameName: "",
    timeStart: "",
    priceTicket: 0
  });



  const removeToggle = (showTime) => {
    toggle();
    setshowTime(showTime);
  }

  const renderRowData = () => {
    return listDetailShowTime.showtimes?.map((showTime, index) => {
      return (
        <tr key={index}>
          <td>{showTime.id}</td>
          <td>{showTime.Film?.name}</td>
          <td>{showTime.CinemaCluster?.name}</td>
          <td>{showTime.Cinema?.name}</td>
          <td>{showTime.timeStart}</td>
          <td>{showTime.priceTicket}đ</td>
          <td>
            {/* <Link to='/admin/cap-nhat-suat-chieu'>
              <MDBBtn color="success" size="sm" title="Chỉnh sửa" onClick={() => {
                dispatch({
                  type: 'DATA_EDIT_SHOWTIME',
                  dataEditShowtime: showTime
                })
              }} >
                <MDBIcon icon="pencil-ruler" />
              </MDBBtn>
            </Link> */}

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
            dispatch(xoaLichChieu(showTime.id))
            toggle();
          }}>Xóa</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

    </Fragment>
  );
}

export default TableShowtime;