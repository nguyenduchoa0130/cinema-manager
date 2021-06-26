// import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup'
// import TitleBox from '../../../components/TittleBox';
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import styles from "./style.module.scss";
// import { suaLichChieu } from '../../../redux/actions/QuanLyLichChieuAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { layCumRapTheoHethong } from '../../../redux/actions/QuanLyCumRapAction';
// import { layRapTheoCumRap } from '../../../redux/actions/QuanLyRapAction';
// import { layHeThongRap } from '../../../redux/actions/QuanLyHeThongRapAction';


// const EditShowtime = () => {
//   const { dataEditShowtime } = useSelector(state => state.QuanLyLichChieuReducer)
//   console.log('dataEditShowtime', dataEditShowtime);
//   const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
//   const { listCumRapTheoHeThong } = useSelector(state => state.QuanLyCumRapReducer)
//   const { listRapTheoCumRap } = useSelector(state => state.QuanLyRapReducer)
//   const dispatch = useDispatch()
//   const [values, setValues] = useState([]);
//   const [dataShowtime, setDataShowtime] = useState()
//   console.log('dataShowtime', dataShowtime);

//   // useEffect(() => {
//   //   dispatch(layHeThongRap());
//   // }, [])

//   // useEffect(() => {
//   //   setDataShowtime({
//   //     ...dataEditShowtime,
//   //     dataShowtime: dataEditShowtime
//   //   })
//   // }, [dataEditShowtime])


//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       systemId: dataEditShowtime.CinemaSystem?.id,
//       clusterId: dataEditShowtime.CinemaCluster?.id,
//       cinemaId: dataEditShowtime.Cinema?.id,
//       timeStart: dataEditShowtime.timeStart,
//       priceTicket: dataEditShowtime.priceTicket,
//     },
//     validationSchema: Yup.object().shape({
//       priceTicket: Yup.string().required("Required!"),
//     }),
//     onSubmit: values => {
//       console.log('values', values);
//       dispatch(suaLichChieu(values, dataEditShowtime.Film?.id))
//     }
//   })

//   const rap_Formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       systemId: '',
//       clusterId: '',
//       cinemaId: '',
//     },
//   })
//   // useEffect(() => {
//   //   setDataShowtime({
//   //     dataShowtime: formik.values
//   //   })
//   // }, [formik.values])

//   // useEffect(() => {
//   //   dispatch(layCumRapTheoHethong(rap_Formik.values.systemId))
//   // }, [rap_Formik.values.systemId])

//   // useEffect(() => {
//   //   dispatch(layRapTheoCumRap(rap_Formik.values.clusterId))
//   // }, [rap_Formik.values.clusterId])

//   const renderHeThongRap = () => {
//     return listHeThongRap.systems?.map((system, index) => {
//       return <option key={index} value={system.id}>{system.systemName}</option>
//     })
//   }
//   const renderCumRap = () => {
//     return listCumRapTheoHeThong.clusters?.map((cluster, index) => {
//       return <option key={index} value={cluster.id}>{cluster.clusterName}</option>
//     })
//   }
//   const renderRap = () => {
//     return listRapTheoCumRap.cinemas?.map((cinema, index) => {
//       return <option key={index} value={cinema.id}>{cinema.cinemaName}</option>
//     })
//   }

//   return (
//     <React.Fragment>
//       <TitleBox text={"Cập nhật suất chiếu"} />
//       <MDBCard className="py-3">
//         <MDBCardBody>
//           <MDBContainer>
//             <form onSubmit={formik.handleSubmit}>
//               <MDBRow className="mb-3">
//                 <MDBCol md="2" className="mb-3">
//                   <label className="grey-text">
//                     Hệ thống
//                   </label>
//                 </MDBCol>
//                 <MDBCol md="10" className="mb-3">
//                   <select name="systemId" className="browser-default custom-select" value={formik.values.systemId} onChange={rap_Formik.handleChange}>
//                     <option selected={dataShowtime?.dataEditShowtime?.CinemaSystem?.id}>{dataShowtime?.dataEditShowtime?.dataEditShowtime?.CinemaSystem?.name}</option>
//                     {renderHeThongRap()}
//                   </select>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className="mb-3">
//                 <MDBCol md="2" className="mb-3">
//                   <label className="grey-text">
//                     Cụm rạp
//                   </label>
//                 </MDBCol>
//                 <MDBCol md="10" className="mb-3">
//                   <select name="clusterId" className="browser-default custom-select" value={formik.values.clusterId} onChange={rap_Formik.handleChange}>
//                     <option selected={dataShowtime?.CinemaCluster?.id}>{dataShowtime?.CinemaCluster?.name}</option>
//                     {renderCumRap()}
//                   </select>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className="mb-3">
//                 <MDBCol md="2" className="mb-3">
//                   <label className="grey-text">
//                     Rạp
//                   </label>
//                 </MDBCol>
//                 <MDBCol md="10" className="mb-3">
//                   <select name="cinemaId" className="browser-default custom-select" value={formik.values.cinemaId} onChange={rap_Formik.handleChange}>
//                     <option selected={dataShowtime?.Cinema?.id}>{dataShowtime?.Cinema?.name}</option>
//                     {renderRap()}
//                   </select>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className="mb-3">
//                 <MDBCol md="2">
//                   <label
//                     htmlFor="defaultFormRegisterPasswordEx4"
//                     className="grey-text"
//                   >
//                     Thời gian bắt đầu
//                   </label>
//                 </MDBCol>
//                 <MDBCol md="10">
//                   <DatePicker
//                     format="YYYY-MM-DD HH:mm"
//                     containerClassName={styles.dateTime_Picker}
//                     inputClass="custom-input"
//                     value={formik.values.timeStart = values?.map(item => {
//                       return item.format("YYYY-MM-DD HH:mm")
//                     })}
//                     onChange={setValues}
//                     multiple
//                     plugins={[
//                       <TimePicker position="bottom" hideSeconds />,
//                       <DatePanel markFocused />
//                     ]}
//                   />
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className="mb-3">
//                 <MDBCol md="2">
//                   <label
//                     className="grey-text"
//                   >
//                     Giá vé
//                   </label>
//                 </MDBCol>
//                 <MDBCol md="10">
//                   <input
//                     type="number"
//                     min="0"
//                     value={dataShowtime?.priceTicket}
//                     onChange={formik.handleChange}
//                     className="form-control"
//                     name="priceTicket"
//                     placeholder="Giá vé"
//                     required
//                   />
//                 </MDBCol>
//               </MDBRow>

//               <hr />
//               <MDBRow className="justify-content-center">
//                 <MDBBtn color="primary" type="submit" >
//                   Submit Form
//               </MDBBtn>
//               </MDBRow>

//             </form>
//           </MDBContainer>
//         </MDBCardBody>
//       </MDBCard>
//     </React.Fragment>
//   )
// }
// export default EditShowtime;