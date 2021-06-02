import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';
import { layTheLoaiPhim, suaPhim } from '../../../redux/actions/QuanLyPhimAction';


const EditCustomer = () => {
  const [customer, setCustomer] = useState({
    id: "",
    fullName: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange =(event)=>{
    setCustomer(prevState => {
      return {...prevState, [event.target.name]: event.target.value}
    });
  }

  const handleSubmit = ()=>{
    console.log('customer :>> ', customer);
  }


  return (
    <React.Fragment>
      <Title text={"Cập nhật thông tin khách hàng"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Mã khách hàng
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <input
                    value={customer.id}
                    name="id"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Mã khách hàng"
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
                    Tên khách hàng
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <input
                    value={customer.fullName}
                    name="fullName"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên khách hàng"
                    required
                  />
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
                    value={customer.phone}
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterConfirmEx3"
                    className="form-control"
                    name="phone"
                    placeholder="Số điện thoại"
                  />
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
                    value={customer.email}
                    onChange={handleChange}
                    type="email"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Địa chỉ
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={customer.address}
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="address"
                    placeholder="Địa chỉ"
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
export default EditCustomer;
