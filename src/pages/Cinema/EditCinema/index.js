import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { suaRap } from '../../../redux/actions/QuanLyRapAction';
import { layCumRap } from '../../../redux/actions/QuanLyCumRapAction';


const EditCinema = () => {
  const { dataRapEdit } = useSelector(state => state.QuanLyRapReducer)
  const { listCumRap } = useSelector(state => state.QuanLyCumRapReducer)
  const [cinema, setCinema] = useState()
  useEffect(() => {
    setCinema({
      ...dataRapEdit,
      cinema: dataRapEdit
    })
  }, [dataRapEdit])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layCumRap())
  }, [])

  const formik = useFormik({
    initialValues: {
      cinemaName: dataRapEdit.cinemaName,
      col: dataRapEdit.col,
      row: dataRapEdit.row,
      clusterId: dataRapEdit.clusterId,
    },
    validationSchema: Yup.object().shape({
      cinemaName: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      console.log(values);
      dispatch(suaRap(values, dataRapEdit.id))
    }
  })
  useEffect(() => {
    setCinema({
      cinema: formik.values
    })
  }, [formik.values])

  const renderCumrap = () => {
    return listCumRap.clusters?.map((cluster, index) => {
      return <option key={index} value={cluster.id}>{cluster.clusterName}</option>
    })
  }

  return (
    <React.Fragment>
      <Title text={"Thêm rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Tên  rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    value={cinema?.cinema.cinemaName}
                    name="cinemaName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên cụm rạp"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Số dòng ghế
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    // readOnly={true}
                    value={cinema?.cinema.row}
                    name="row"
                    onChange={formik.handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Số dòng ghế"
                    min={1}
                    max={10}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Số cột ghế
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    // readOnly={true}
                    value={cinema?.cinema.col}
                    name="col"
                    onChange={formik.handleChange}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Số cột ghế"
                    min={1}
                    max={10}
                    required
                  />
                </MDBCol>
              </MDBRow>


              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Cụm rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="clusterId" className="browser-default custom-select" onChange={formik.handleChange}>
                    <option selected={dataRapEdit.clusterId}>{dataRapEdit.CinemaCluster?.name}</option>
                    {renderCumrap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn color="primary" type="submit" >
                  Cập nhật
              </MDBBtn>
              </MDBRow>
            </form>

          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
export default EditCinema;
