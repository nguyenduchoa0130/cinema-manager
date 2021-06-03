import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './style.module.scss';
import Title from '../../../components/Tittle';
import { useDispatch, useSelector } from 'react-redux';


const EditCluster = () => {
  const [cluster, setCluster] = useState({
    id: "",
    clustermName: "",
    address:  null,
    systemId:false
  });

  const handleChange =(event)=>{
    setCluster(prevState => {
      return {...prevState, [event.target.name]: event.target.value}
    });
  }

  const handleSubmit = ()=>{
    console.log('cluster :>> ', cluster);
  }

  return (
    <React.Fragment>
      <Title text={"Cập nhât thông tin cụm rạp"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={handleSubmit}>
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
                    value={cluster.clusterName}
                    name="clusterName"
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
                    htmlFor="defaultFormRegisterreleaseYearEx2"
                    className="grey-text"
                  >
                    Địa chỉ
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <input
                    value={cluster.address}
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
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Hệ thống
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select name="systemId" className="browser-default custom-select" onChange={handleChange}>
                    <option value={1}>CGV</option>
                    <option value={2}>Lotte</option>
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
export default EditCluster;
