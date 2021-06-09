import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Title from '../../../components/Tittle';
import countryList from '../../../util/constants/countryList';
import { useDispatch, useSelector } from 'react-redux';
import { layTheLoaiPhim, suaPhim } from '../../../redux/actions/QuanLyPhimAction';


const EditFilm = () => {
  const { listCategory, dataFilmEdit } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch();
  const [dataFilm, setDataFilm] = useState()
  console.log('dataFilm', dataFilm);

  useEffect(() => {
    setDataFilm({
      ...dataFilmEdit,
      dataFilm: dataFilmEdit
    })
  }, [dataFilmEdit],)

  useEffect(() => {
    dispatch(layTheLoaiPhim());
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      filmName: dataFilmEdit.filmName,
      country: dataFilmEdit.country,
      releaseYear: dataFilmEdit.releaseYear,
      duration: dataFilmEdit.duration,
      actors: dataFilmEdit.actors,
      categoryId: dataFilmEdit.categoryId,
      director: dataFilmEdit.director,
      thumbnail: dataFilmEdit.thumbnail,
      desc: dataFilmEdit.desc,
      poster: dataFilmEdit.poster,
      premiere: dataFilmEdit.premiere,
      statusId: dataFilmEdit.statusId,
      trailer:dataFilmEdit.trailer
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
      console.log(values);
      dispatch(suaPhim(form_data, dataFilmEdit.id))

    },
  });

  useEffect(() => {
    setDataFilm({
      dataFilm: formik.values
    })
  }, [formik.values])

  const renderTheLoaiPhim = () => {
    return listCategory.categories?.map((theLoai, index) => {
      return <option key={index} value={theLoai.id}>{theLoai.categoryName}</option>
    })
  }


  return (
    <React.Fragment>
      <Title text={"Cập nhật thông tin phim"} />
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
                    value={dataFilm?.dataFilm.filmName}
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
                    <option selected={dataFilmEdit.country}>{dataFilmEdit.country}</option>
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
                    value={dataFilm?.dataFilm.releaseYear}
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
                    value={dataFilm?.dataFilm.duration}
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
                    value={dataFilm?.dataFilm.director}
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="director"
                    placeholder="Đạo diển"
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
                    Diển viên
                  </label></MDBCol>
                <MDBCol md="10">
                  <input
                    value={dataFilm?.dataFilm.actors}
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="actors"
                    placeholder="Diển viên"
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
                    <option selected={dataFilmEdit['Category.name']}>{dataFilmEdit['Category.name']}</option>
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
                    Trạng thái
                  </label>
                </MDBCol>
                <MDBCol md="10" >
                  <input  className="form-control" readOnly={true} value={dataFilmEdit['StatusFilm.name']} />
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
                  <input type="date" name="premiere" value={formik.values['premiere']} onChange={formik.handleChange} />
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
                  <textarea value={dataFilm?.dataFilm.desc} className="form-control" rows={4} id="desc" name="desc" onChange={formik.handleChange} />
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
                    value={dataFilm?.dataFilm.trailer}
                    onChange={formik.handleChange}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="trailer"
                    placeholder="Link trailer"
                  />
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
                        Chọn ảnh thumbnail
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
                        Chọn ảnh poster
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
export default EditFilm;
