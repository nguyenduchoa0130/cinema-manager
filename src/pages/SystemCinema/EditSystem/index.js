import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { suaHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';


const EditSystem = () => {
  const { dataSystemEdit } = useSelector(state => state.QuanLyHeThongRapReducer)
  const [systemEdit, setSystemEdit] = useState()
  // console.log('dataSystemEdit',dataSystemEdit);
  // console.log('systemEdit',systemEdit);
  useEffect(() => {
    setSystemEdit({
      ...dataSystemEdit,
      systemEdit: dataSystemEdit
    })
  }, [dataSystemEdit])
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      systemName: dataSystemEdit.systemName,
      logo: null
    },
    validationSchema: Yup.object().shape({
      systemName: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      let form_data = new FormData();
      for (var key in values) {
        form_data.append(key, values[key])
      }
      console.log('value', values);
      dispatch(suaHeThongRap(form_data, dataSystemEdit.id))
    }
  })
  useEffect(() => {
    setSystemEdit({
      systemEdit: formik.values
    })
  }, [formik.values])

  return (
    <React.Fragment>
      <Title text={"Cập nhật thông tin hệ thống rạp"} />
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
                    Tên hệ thống rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    value={systemEdit?.systemEdit.systemName}
                    name="systemName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên hệ thống rạp"
                  />
                  {formik.errors.systemName && formik.touched.systemName && (
                    <p className="text-danger">{formik.errors.systemName} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterConfirmEx3"
                    className="grey-text"
                  >
                    Logo
                  </label></MDBCol>
                <MDBCol md="10">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={(event) => {
                          formik.setFieldValue("logo", event.currentTarget.files[0]);
                        }}
                        name="logo"
                      />
                      <label className="custom-file-label" >
                        {formik.values.logo ? formik.values.logo.name : " Chọn logo hệ thống rạp"}
                      </label>
                    </div>
                  </div>
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
export default EditSystem;
