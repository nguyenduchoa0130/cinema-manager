import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Title from '../../../components/Tittle';
import { useDispatch } from 'react-redux';
import { themHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';


const AddSystem = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      systemName: '',
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

      dispatch(themHeThongRap(form_data))
    }
  })

  return (
    <React.Fragment>
      <Title text={"Thêm hệ thống rạp"} />
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
                        {formik.values.logo ? formik.values.logo.name : "Chọn logo hệ thống rạp"}
                      </label>
                    </div>
                  </div>
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
export default AddSystem;
