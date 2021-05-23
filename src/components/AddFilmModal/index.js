import { MDBBtn, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const AddFilmModal = ({ isShowing, hide }) => {

  const [info, setInfo] = useState(
    {
      name: "",
      country: "",
      releaseYear: "",
      duration: "",
      director: "",
      actors: "",
      category: -1,
    }
  );

  const changeHandler = event => {
    setInfo({ [event.target.name]: event.target.value });
  };


  return (isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <MDBModal size="lg" isOpen={isShowing} toggle={hide}>
        <MDBModalHeader toggle={hide}>Thêm phim</MDBModalHeader>
        <MDBModalBody>
          <MDBContainer>
            <form>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label
                    htmlFor="defaultFormRegisterNameEx"
                    className="grey-text"
                  >
                    Tên phim
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <input
                    value={info.name}
                    name="name"
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên phim"
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
                    Quốc gia
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    value={info.country}
                    name="country"
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterreleaseYearEx2"
                    className="form-control"
                    placeholder="Quốc gia"
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
                    Năm sản xuất
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={info.releaseYear}
                    onChange={changeHandler}
                    type="releaseYear"
                    id="defaultFormRegisterConfirmEx3"
                    className="form-control"
                    name="releaseYear"
                    placeholder="Năm sản xuất"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Thời lượng
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <input
                    value={info.duration}
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="duration"
                    placeholder="Thời lượng"
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
                    Đạo diển
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={info.director}
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="director"
                    placeholder="Đạo diển"
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
                    Diển viên
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={info.actors}
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="actors"
                    placeholder="Diển viên"
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
                    Thể loại
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <select className="browser-default custom-select">
                    <option>Chọn thể loại phim</option>
                    <option value="1">Hài kịch</option>
                    <option value="2">Hành động</option>
                    <option value="3">Kinh dị</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Thumbnail
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupFileAddon01">
                      Thumbnail
    </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Choose file
    </label>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Poster
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupFileAddon01">
                      Poster
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Choose file
    </label>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
              <hr/>
              <MDBRow className="justify-content-center">
                
                <MDBBtn color="primary" type="submit" >
                Submit Form
              </MDBBtn>
              </MDBRow>
              
            </form>
          </MDBContainer>
        </MDBModalBody >

      </MDBModal >
    </React.Fragment >, document.body
  ) : null)
}
export default AddFilmModal;