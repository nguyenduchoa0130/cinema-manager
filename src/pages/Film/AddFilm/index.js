
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TitleBox from '../../../components/TittleBox';
import countryList from '../../../util/constants/countryList';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { layTheLoaiPhim, themPhim } from '../../../redux/actions/QuanLyPhimAction';



const AddFilm = () => {

  const { listCategory } = useSelector(state => state.QuanLyPhimReducer)
  // console.log('listCategory', listCategory);
  useEffect(() => {
    dispatch(layTheLoaiPhim());
  })

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      filmName: "",
      country: "",
      releaseYear: "",
      duration: "",
      actors: "",
      categoryId: 1,
      director: "",
      thumbnail: null,
      trailer: "",
      premiere: "",
      desc: "",
      poster: null
    },
    validationSchema: Yup.object().shape({
      filmName: Yup.string().required("Required!"),
      country: Yup.string().required("Required!"),
      releaseYear: Yup.string().required("Required!"),
      duration: Yup.string().required("Required!"),
      actors: Yup.string().required("Required!"),
      director: Yup.string().required("Required!"),
      trailer: Yup.string().required("Required!"),
      desc: Yup.string().required("Required!"),
    }),
    onSubmit: values => {
      let form_data = new FormData();
      for (var key in values) {
        form_data.append(key, values[key])
      }
      console.log('value', values);

      dispatch(themPhim(form_data))

    },
  });
  const renderTheLoaiPhim = () => {
    return listCategory.categories?.map((theLoai, index) => {
      return <option key={index} value={theLoai.id}>{theLoai.categoryName}</option>
    })
  }



  return (
    <React.Fragment>

      <TitleBox text={"Thêm phim"} />
      <MDBCard className="py-3">
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="2" className="mb-3">
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Tên phim
                  </label>
                </MDBCol>
                <MDBCol md="10" className="mb-3">
                  <input
                    name="filmName"
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    placeholder="Tên phim"
                  />
                  {formik.errors.filmName && formik.touched.filmName && (
                    <p className="text-danger">{formik.errors.filmName} </p>
                  )}
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
                  <select
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values['country']}
                    className="browser-default custom-select">
                    <option value="">Chọn quốc gia</option>
                    {countryList.map((country, index) => {
                      return <option key={index} value={country}>{country}</option>
                    })}

                  </select>
                  {formik.errors.country && formik.touched.country && (
                    <p className="text-danger">{formik.errors.country} </p>
                  )}
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
                    onChange={formik.handleChange}
                    type="releaseYear"
                    id="defaultFormRegisterConfirmEx3"
                    className="form-control"
                    name="releaseYear"
                    placeholder="Năm sản xuất"
                  />
                  {formik.errors.releaseYear && formik.touched.releaseYear && (
                    <p className="text-danger">{formik.errors.releaseYear} </p>
                  )}
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
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="duration"
                    placeholder="Thời lượng"
                  />
                  {formik.errors.duration && formik.touched.duration && (
                    <p className="text-danger">{formik.errors.duration} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Đạo diễn
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="director"
                    placeholder="Đạo diễn"
                  />
                  {formik.errors.director && formik.touched.director && (
                    <p className="text-danger">{formik.errors.director} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Diễn viên
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="actors"
                    placeholder="Diễn viên"
                  />
                  {formik.errors.actors && formik.touched.actors && (
                    <p className="text-danger">{formik.errors.actors} </p>
                  )}
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
                  <select name="categoryId" className="browser-default custom-select" value={formik.values['categoryId']} onChange={formik.handleChange}>
                    <option>Chọn thể loại phim</option>
                    {renderTheLoaiPhim()}
                  </select>
                  {formik.errors.categoryId && formik.touched.categoryId && (
                    <p className="text-danger">{formik.errors.categoryId} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2" >
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Ngày công chiếu
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <input  type="date" name="premiere" value={formik.values['premiere']} onChange={formik.handleChange} />
                  {formik.errors.premiere && formik.touched.premiere && (
                    <p className="text-danger">{formik.errors.premiere} </p>
                  )}
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
                  <textarea className="form-control" rows={4} id="desc" name="desc" onChange={formik.handleChange} />
                  {formik.errors.desc && formik.touched.desc && (
                    <p className="text-danger">{formik.errors.desc} </p>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="2">
                  <label
                    htmlFor="defaultFormRegisterPasswordEx4"
                    className="grey-text"
                  >
                    Link Trailer
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="trailer"
                    placeholder="Link trailer" />
                    {formik.errors.trailer && formik.touched.trailer && (
                    <p className="text-danger">{formik.errors.trailer} </p>
                  )}
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
                        onChange={(event) => {
                          formik.setFieldValue("thumbnail", event.currentTarget.files[0]);
                        }}
                        name="thumbnail"
                      />
                      <label className="custom-file-label" >
                        {formik.values.thumbnail ? formik.values.thumbnail.name : "Chọn ảnh thumbnail"}
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
                        onChange={(event) => {
                          formik.setFieldValue("poster", event.currentTarget.files[0]);
                        }}
                        name="poster"
                      />
                      <label className="custom-file-label" >
                        {formik.values.poster ? formik.values.poster.name : "Chọn ảnh poster"}
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
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  )
}
export default AddFilm;