import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { suaNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';


const EditCustomer = () => {

  const { dataUserEdit } = useSelector(state => state.QuanLyNguoiDungReducer)
  // console.log('dataUserEdit', dataUserEdit);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState()
  // console.log('dataUser', dataUser);

  useEffect(() => {
    setDataUser({
      ...dataUserEdit,
      dataUser: dataUserEdit
    })
  }, [dataUserEdit],)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: dataUserEdit?.fullName,
      phone: dataUserEdit?.phone,
      password: "",
      roleId: dataUserEdit?.roleId,
    },
    validationSchema: Yup.object().shape({
      filmName: Yup.string().required("Required!"),
      phone: Yup.string().required("Required!"),
      password: Yup.string().required("Required!"),
      roleId: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      console.log('values', values);
      dispatch(suaNguoiDung(values, dataUserEdit.id));
    },
  });

  useEffect(() => {
    setDataUser({
      dataUser: formik.values
    })
  }, [formik.values])

  return (
    <React.Fragment>
      <Title text={"Cập nhật thông tin khách hàng"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Loại người dùng
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="roleId" className="browser-default custom-select" onChange={formik.handleChange}>
                    <option>{dataUserEdit['Role.name']}</option>
                    <option value={1}>Quản trị viên</option>
                    <option value={2}>Khách hàng</option>
                  </select>
                  {formik.errors.roleId && formik.touched.roleId && (
                    <p className="text-danger">{formik.errors.roleId} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Mã khách hàng
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <input
                    readOnly={true}
                    value={dataUserEdit.id}
                    name="id"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Mã khách hàng"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterreleaseYearEx2"
                    className="grey-text"
                  >
                    Tên khách hàng
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    value={dataUser?.dataUser.fullName}
                    name="fullName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên khách hàng"
                  />
                  {formik.errors.fullName && formik.touched.fullName && (
                    <p className="text-danger">{formik.errors.fullName} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterConfirmEx3"
                    className="grey-text"
                  >
                    Số điện thoại
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={dataUser?.dataUser.phone}
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterConfirmEx3"
                    className="form-control"
                    name="phone"
                    placeholder="Số điện thoại"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-danger">{formik.errors.phone} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Email
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    readOnly={true}
                    value={dataUserEdit.email}
                    onChange={formik.handleChange}
                    type="email"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Mật khẩu
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    onChange={formik.handleChange}
                    type="password"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="password"
                    placeholder="Mật khẩu"
                  />
                </MDBCol>
              </MDBRow>

              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn onClick={() => {
                  if(!formik.values.password.trim().length){
                    delete formik.values.password
                  }
                  dispatch(suaNguoiDung(formik.values, dataUserEdit.id))
                }} color="primary" type="submit" >
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
export default EditCustomer;
