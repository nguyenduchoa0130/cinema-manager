import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import TitleBox from '../../../components/TittleBox';
import { useDispatch, useSelector } from 'react-redux';
import { themRap } from '../../../redux/actions/QuanLyRapAction';
import { layCumRap } from '../../../redux/actions/QuanLyCumRapAction';

const AddCinema = () => {

  const { listCumRap } = useSelector(state => state.QuanLyCumRapReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layCumRap())
  },)

  const formik = useFormik({
    initialValues: {
      cinemaName: "",
      col: 0,
      row: 0,
      clusterId: null,
    },
    validationSchema: Yup.object().shape({
      cinemaName: Yup.string().required("Required!"),
      col: Yup.string().required("Required!"),
      row: Yup.string().required("Required!"),
      clusterId: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      dispatch(themRap(values))
    }
  })

  const renderCumrap = () => {
    return listCumRap.clusters?.map((cluster, index) => {
      return <option key={index} value={cluster.id}>{cluster.clusterName}</option>
    })
  }

  return (
    <React.Fragment>
      <TitleBox text={"Thêm rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Tên rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    name="cinemaName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên rạp"
                  />
                  {formik.errors.cinemaName && formik.touched.cinemaName && (
                    <p className="text-danger">{formik.errors.cinemaName} </p>
                  )}
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
                    name="row"
                    onChange={formik.handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Số dòng ghế"
                    min={1}
                    max={10}
                    required
                  />
                  {formik.errors.row && formik.touched.row && (
                    <p className="text-danger">{formik.errors.row} </p>
                  )}
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
                  {formik.errors.col && formik.touched.col && (
                    <p className="text-danger">{formik.errors.col} </p>
                  )}
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
                    <option>Chọn cụm rạp</option>
                    {renderCumrap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn color="primary" type="submit" >
                  Thêm
              </MDBBtn>
              </MDBRow>
            </form>

          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
export default AddCinema;
