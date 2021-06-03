import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';


const EditCinema = () => {
  const [cinema, setCinema] = useState({
    id: "",
    cinemaName: "",
    address:  "",
    col: -1,
    row: -1,
    clusterId:"",
  });

  const handleChange =(event)=>{
    setCinema(prevState => {
      return {...prevState, [event.target.name]: event.target.value}
    });
  }

  const handleSubmit = ()=>{
    console.log('cinema :>> ', cinema);
  }

  return (
    <React.Fragment>
      <Title text={"Thêm rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={handleSubmit}>
             <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Tên  rạp
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <input
                    value={cinema.cinemaName}
                    name="cinemaName"
                    onChange={handleChange}
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
                    className="grey-text"
                  >
                    Địa chỉ
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <input
                    value={cinema.address}
                    name="address"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Địa chỉ"
                    required
                  />
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
                    value={cinema.row}
                    name="row"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Số dòng ghế"
                    required
                  />
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
                    value={cinema.col}
                    name="col"
                    onChange={handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Số cột ghế"
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
                    Cụm rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="clusterId" className="browser-default custom-select" onChange={handleChange}>
                    <option value={1}>CGV Sư Vạn Hạnh</option>
                    <option value={2}>Lotte - Nowzone</option>
                  </select>
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
export default EditCinema;
