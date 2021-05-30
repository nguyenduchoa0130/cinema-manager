import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState,useMemo} from 'react';
import ReactDOM from 'react-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styles from './style.module.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Title from '../../../components/Tittle';
import countryList from '~/util/constants/countryList';


const EditFilm = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [info, setInfo] = useState(
    {
      name: "",
      country: "",
      releaseYear: "",
      duration: "",
      actors: "",
      category: -1,
      director: "",
      thumbnail: null,
      desc:"",
      poster: null
    }
  );

  const handleImageChange = (event) => {
    setInfo(prevState => {
      return { ...prevState, [event.target.name]: event.target.files[0] }
    });
  }

  const changeHandler = event => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    console.log('info ', info);
  };


  return (
    <React.Fragment>

      <Title text={"Cập nhật thông tin phim"} />
      <MDBCard className = "py-3">
        <MDBCardBody>
          <MDBContainer>
            <form action="/abc">
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
                  {/* <input
                    value={info.country}
                    name="country"
                    onChange={changeHandler}
                    type="text"
                    id="defaultFormRegisterreleaseYearEx2"
                    className="form-control"
                    placeholder="Quốc gia"
                    required
                  /> */}

                  <select value={info.country}
                    name="country"
                    onChange={changeHandler}
                    className="browser-default custom-select">
                    <option>Chọn quốc gia</option>
                    {countryList.map(country=>{
                      return  <option value="country">{country}</option>
                    })}
                  </select>
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
                    className="grey-text"
                  >
                    Mô tả
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <div className="border">
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="px-3"
                      onEditorStateChange={setEditorState}
                    />

                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    className="grey-text"
                  >
                    Thumbnail
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={handleImageChange}
                        name="thumbnail"
                      />
                      <label className="custom-file-label" >
                        {info.thumbnail ? info.thumbnail.name : "Chọn ảnh thumbnail"}
                      </label>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    className="grey-text"
                  >
                    Poster
                  </label>
                </MDBCol>
                <MDBCol md="10">
                  <div className="input-group">

                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={handleImageChange}
                        name="poster"
                      />
                      <label className="custom-file-label" >
                        {info.poster ? info.poster.name : "Chọn ảnh poster"}
                      </label>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>

              <hr />
              <MDBRow className="justify-content-center">

                <MDBBtn color="primary" type="submit" >
                  Submit Form
              </MDBBtn>
              </MDBRow>

            </form>
            <a onClick={() => { console.log('editorState :>> ', draftToHtml(convertToRaw(editorState.getCurrentContent()))) }} className="btn btn-primary">Test lấy value trong editor</a>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
export default EditFilm;