import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';


const AddSystem = () => {
  const [system, setSystem] = useState({
    id: "",
    systemName: "",
    logoSrc: null,
    logo:false
  });

  const handleChange =(event)=>{
    setSystem(prevState => {
      return {...prevState, [event.target.name]: event.target.value}
    });
  }

  const handleSubmit = ()=>{
    console.log('system :>> ', system);
  }

  const handleImageChange = (event)=>{
    setSystem(prevState=>{
      return {...prevState,logoSrc : event.currentTarget.files[0]}
    })
    console.log('system.logoSrc :>> ', system.logoSrc);
  }

  return (
    <React.Fragment>
      <Title text={"Thêm hệ thống rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Mã hệ thống rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <input
                    value={system.id}
                    name="id"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Mã hệ thống rạp"
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
                    Tên hệ thống rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <input
                    value={system.systemName}
                    name="systemName"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên hệ thống rạp"
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
                    Logo
                  </label></MDBCol>
                <MDBCol md="10">
                <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={handleImageChange}
                        name="logoSrc"
                      />
                      <label className="custom-file-label" >
                        {system.logoSrc?system.logoSrc.name: "Chọn logo hệ thống rạp"}
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
export default AddSystem;
