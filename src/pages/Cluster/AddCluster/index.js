import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import TitleBox from '../../../components/TittleBox';
import { useDispatch, useSelector } from 'react-redux';
import { layHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';
import { themCumRap } from '../../../redux/actions/QuanLyCumRapAction';


const AddCluster = () => {
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layHeThongRap())
  })

  const formik = useFormik({
    initialValues: {
      clustermName: "",
      address: "",
      systemId: null
    },
    validationSchema: Yup.object().shape({
      clusterName: Yup.string().required("Required!"),
      address: Yup.string().required("Required!"),
      systemId: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      dispatch(themCumRap(values))
    }
  })

  const renderHeThongRap = () => {
    return listHeThongRap.systems?.map((system, index) => {
      return <option key={index} value={system.id}>{system.systemName}</option>
    })
  }

  return (
    <React.Fragment>
      <TitleBox text={"Thêm cụm rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterreleaseYearEx2"
                    className="grey-text"
                  >
                    Tên cụm rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    name="clusterName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên cụm rạp"
                    required
                  />
                  {formik.errors.clustermName && formik.touched.clustermName && (
                    <p className="text-danger">{formik.errors.clustermName} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterreleaseYearEx2"
                    className="grey-text"
                  >
                    Địa chỉ
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Địa chỉ"
                  />
                  {formik.errors.address && formik.touched.address && (
                    <p className="text-danger">{formik.errors.address} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Hệ thống rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="systemId" className="browser-default custom-select" onChange={formik.handleChange} >
                    <option>Chọn hệ thống rạp</option>
                    {renderHeThongRap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn onClick={() => {
                  // dispatch(themCumRap(formik.values))
                }} color="primary" type="submit" >
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
export default AddCluster;
