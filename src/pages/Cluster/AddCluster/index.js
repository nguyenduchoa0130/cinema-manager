import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { layHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';
import { themCumRap } from '../../../redux/actions/QuanLyCumRapAction';


const AddCluster = () => {
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layHeThongRap())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formik = useFormik({
    initialValues: {
      clustermName: "",
      address: "",
      systemId: null
    },
    validationSchema: Yup.object().shape({
      cluster: Yup.string().required("Required!"),
      address: Yup.string().required("Required!"),
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
      <Title text={"Thêm cụm rạp"} />
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
                    Hệ thống rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="systemId" className="browser-default custom-select" onChange={formik.handleChange}>
                    {renderHeThongRap()}
                  </select>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn onClick={() => {
                  dispatch(themCumRap(formik.values))
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
