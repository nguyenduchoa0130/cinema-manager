
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import Title from '../../../components/Tittle';
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import styles from "./style.module.scss";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhim } from '../../../redux/actions/QuanLyPhimAction';
import { themLichChieu } from '../../../redux/actions/QuanLyLichChieuAction';
import { layCumRapTheoHethong } from '../../../redux/actions/QuanLyCumRapAction';
import { layHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';
import { layRapTheoCumRap } from '../../../redux/actions/QuanLyRapAction';


const AddShowtime = () => {
  const [values, setValues] = useState();
  const { listFilm } = useSelector(state => state.QuanLyPhimReducer)
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  const { listCumRapTheoHeThong } = useSelector(state => state.QuanLyCumRapReducer)
  const { listRapTheoCumRap } = useSelector(state => state.QuanLyRapReducer)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhim());
    dispatch(layHeThongRap());
  }, [])

  const formik = useFormik({
    initialValues: {
      filmId: '',
      systemId: '',
      clusterId: '',
      cinemaId: '',
      timeStart: '06/17/2021 10:07',
      priceTicket: 0,

    },
    validationSchema: Yup.object().shape({
      priceTicket: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      console.log('values', values);
      dispatch(themLichChieu(values))
    }
  })

  const rap_Formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      systemId: '',
      clusterId: '',
      cinemaId: 7
    },

  })

  useEffect(() => {
    dispatch(layCumRapTheoHethong(rap_Formik.values.systemId))
  }, [rap_Formik.values])

  useEffect(() => {
    dispatch(layRapTheoCumRap(rap_Formik.values.clusterId))
  }, [rap_Formik.values.systemId])


  const renderPhim = () => {
    return listFilm.films?.map((film, index) => {
      return <option key={index} value={film.id}>{film.filmName}</option>
    })
  }
  const renderHeThongRap = () => {
    return listHeThongRap.systems?.map((system, index) => {
      return <option key={index} value={system.id}>{system.systemName}</option>
    })
  }

  const renderCumRap = () => {
    return listCumRapTheoHeThong.clusters?.map((cluster, index) => {
      return <option key={index} value={cluster.id}>{cluster.clusterName}</option>
    })
  }

  const renderRap = () => {
    return listRapTheoCumRap.cinemas?.map((cinema, index) => {
      return <option key={index} value={cinema.id}>{cinema.cinemaName}</option>
    })
  }



  return (
    <React.Fragment>

      <Title text={"Thêm suất chiếu"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Phim
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="filmId" className="browser-default custom-select" onChange={formik.handleChange} >
                    <option>Chọn phim</option>
                    {renderPhim()}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Hệ thống
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="systemId" className="browser-default custom-select" value={formik.values.systemId = rap_Formik.values.systemId} onChange={rap_Formik.handleChange}>
                    <option>Chọn hệ thống rạp</option>
                    {renderHeThongRap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Cụm rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="clusterId" className="browser-default custom-select" value={formik.values.clusterId = rap_Formik.values.clusterId} onChange={rap_Formik.handleChange} >
                    <option>Chọn cụm rạp</option>
                    {renderCumRap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="cinemaId" className="browser-default custom-select" value={formik.values.cinemaId = rap_Formik.values.cinemaId} onChange={formik.handleChange}>
                    <option>Chọn rạp</option>
                    {renderRap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Thời gian bắt đầu
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <DatePicker
                    format="MM/DD/YYYY HH:mm"
                    name="timeStart"
                    containerClassName={styles.dateTime_Picker}
                    inputClass="custom-input"
                    value={formik.values['timeStart']}
                    multiple
                    plugins={[
                      <TimePicker position="bottom" hideSeconds />,
                      <DatePanel markFocused />
                    ]}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Giá vé
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    className="form-control"
                    name="priceTicket"
                    placeholder="Giá vé"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">
                <MDBBtn color="primary" type="submit" >
                  Submit Form
              </MDBBtn>
              </MDBRow>

            </form>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
export default AddShowtime;