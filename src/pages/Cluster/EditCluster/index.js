import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { suaCumRap } from '../../../redux/actions/QuanLyCumRapAction';
import { layHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';


const EditCluster = () => {
  const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
  const { dataClusterEdit } = useSelector(state => state.QuanLyCumRapReducer)
  console.log('dataClusterEdit', dataClusterEdit);
  const [cluster, setCluster] = useState()
  console.log('cluster', cluster);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layHeThongRap())
  },)


  useEffect(() => {
    setCluster({
      ...dataClusterEdit,
      cluster: dataClusterEdit
    })
  }, [dataClusterEdit])

  const formik = useFormik({
    initialValues: {
      id: dataClusterEdit.id,
      clusterName: dataClusterEdit.clusterName,
      address: dataClusterEdit.address,
      systemId: dataClusterEdit.systemId
    },
    validationSchema: Yup.object().shape({
      cluster: Yup.string().required("Required!"),
      address: Yup.string().required("Required!"),
      systemId: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      dispatch(suaCumRap(values, dataClusterEdit.id))
    }
  })

  useEffect(() => {
    setCluster({
      cluster: formik.values
    })
  }, [formik.values])

  const renderHeThongRap = () => {
    return listHeThongRap.systems?.map((system, index) => {
      return <option key={index} value={system.id}>{system.systemName}</option>
    })
  }

  return (
    <React.Fragment>
      <Title text={"Cập nhât thông tin cụm rạp"} />
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
                    value={cluster?.cluster.clusterName}
                    name="clusterName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên cụm rạp"
                  />
                  {formik.errors.clusterName && formik.touched.clusterName && (
                    <p className="text-danger">{formik.errors.clusterName} </p>
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
                    value={cluster?.cluster.address}
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
                    Hệ thống
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="systemId" className="browser-default custom-select" onChange={formik.handleChange}>
                    <option selected={dataClusterEdit.CinemaSystem?.id}>{dataClusterEdit.CinemaSystem?.name}</option>
                    {renderHeThongRap()}
                  </select>
                  {formik.errors.systemId && formik.touched.systemId && (
                    <p className="text-danger">{formik.errors.systemId} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn onClick={() => {
                  dispatch(suaCumRap(formik.values, dataClusterEdit.id))
                }} color="primary" type="submit" >
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
export default EditCluster;
