
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React,{ useState} from 'react';
import Title from '../../../components/Tittle';
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import styles from "./style.module.scss";


const AddShowtime = () => {
const [values, setValues] = useState();

  

  return (
    <React.Fragment>

      <Title text={"Thêm suất chiếu"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Phim
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="filmId" className="browser-default custom-select" >
                    <option>Chọn phim</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Hệ thống
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="systemId" className="browser-default custom-select" >
                    <option>Chọn hệ thống rạp</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Cụm rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="clusterId" className="browser-default custom-select" >
                    <option>Chọn cụm rạp</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label className="grey-text">
                    Rạp
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <select name="cinemaId" className="browser-default custom-select" >
                    <option>Chọn rạp</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Thời gian bắt đầu
                  </label>
                </MDBCol>
                <MDBCol md="10">
                <DatePicker
                  format="MM/DD/YYYY HH:mm"
                  containerClassName = {styles.dateTime_Picker}
                  inputClass="custom-input"
                  value={values}
                  onChange={setValues}
                  multiple
                  plugins={[
                    <TimePicker position="bottom" hideSeconds  />,
                    <DatePanel markFocused />
                  ]}
                />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    className="grey-text"
                  >
                    Giá vé
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="priceTicket"
                    placeholder="Giá vé"
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
export default AddShowtime;