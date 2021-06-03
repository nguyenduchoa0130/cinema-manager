import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { themNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';


const AddCustomer = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      roleId: 2
    },
    validationSchema: Yup.object().shape({
      filmName: Yup.string().required("Required!"),
      phone: Yup.string().required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    
    onSubmit: values => {
      console.log('values', values);
      dispatch(themNguoiDung(values));
    },
  });



  return (
    <React.Fragment>
      <Title text={"Thêm khách hàng"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
          <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="roleId"
                    className="grey-text"
                  >
                    Loại người dùng
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select id="roleId" value={formik.values.roleId} name="roleId" className="browser-default custom-select" onChange={formik.handleChange}>
                    <option value={1}>Quản trị viên</option>
                    <option value={2}>Khách hàng</option>
                  </select>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="fullName"
                    className="grey-text"
                  >
                    Tên khách hàng
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    name="fullName"
                    onChange={formik.handleChange}
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="Tên khách hàng"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="phone"
                    className="grey-text"
                  >
                    Số điện thoại
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    name="phone"
                    onChange={formik.handleChange}
                    placeholder="Số điện thoại"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="email"
                    className="grey-text"
                  >
                    Email
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange}
                    placeholder="Email"
                    required
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="password"
                    className="grey-text"
                  >
                    Mật khẩu
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={formik.handleChange}
                    placeholder="Mật khẩu"
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
export default AddCustomer;
