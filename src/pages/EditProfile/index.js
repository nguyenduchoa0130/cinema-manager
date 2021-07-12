
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { editProfile, layThongTinNguoiDung } from "../../redux/actions/NguoiDungAction";
import Title from '../../components/Title'
import { MDBBtn, MDBInput, MDBRow } from "mdbreact";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { USERLOGIN } from "../../util/constants/settingSystem";
import { history } from "../../App";

export default function EditProfile() {
    let userid = '';
    if (localStorage.getItem(USERLOGIN)) {
        let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
        userid = userLogin.userId
    }
    const { thongTinNguoiDung } = useSelector(state => state.NguoiDungReducer)
    const dispatch = useDispatch()
    // console.log('thongTinNguoiDung', thongTinNguoiDung);
    const [state, setstate] = useState(thongTinNguoiDung)
    console.log('state', state);
    useEffect(() => {
        dispatch(layThongTinNguoiDung(userid))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: thongTinNguoiDung.user?.fullName,
            phone: thongTinNguoiDung.user?.phone,
            password: thongTinNguoiDung.user?.password,
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required("Required!"),
            phone: Yup.string().required("Required!"),
            password: Yup.string().required("Required!"),
        }),
        onSubmit: values => {

        },
    });
    useEffect(() => {
        setstate(formik.values)
    }, [formik.values])

    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <Title text={'Thông tin cá nhân'} className="my-5" />
                <div className={cx(styles.avatar_box, "position-relative")}>
                    <img id="profileImg" src="https://banner2.cleanpng.com/20190702/tl/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-5d1bfa95e508d4.2980489715621147099381.jpg" className={cx(styles.avatar_img, "img-sm rounded-circle border")} alt="avatar-img" />
                    <label htmlFor="file-input">
                        <i className={cx(styles.inputAvatar_icon, "fas fa-camera")}></i>
                    </label>
                    <input id="file-input" name="avatar" className="d-none" type="file" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.info}>
                        <ul className={styles.info_list}>
                            <li className={styles.info_item}>
                                <MDBInput className={styles.value} name="fullName" label="Họ và tên" onChange={formik.handleChange} value={state?.user?.fullName} />
                            </li>
                            {formik.errors.fullName && formik.touched.fullName && (
                                <p className="text-danger">{formik.errors.fullName} </p>
                            )}
                            <li className={styles.info_item}>
                                <MDBInput className={styles.value} name="password" type="password" label="Mật khẩu" onChange={formik.handleChange} />
                            </li>
                            {formik.errors.password && formik.touched.password && (
                                <p className="text-danger">{formik.errors.password} </p>
                            )}
                            <li className={styles.info_item}>
                                <MDBInput className={styles.value} name="phone" label="Số điện thoại" onChange={formik.handleChange} value={state?.user?.phone} />
                            </li>
                            {formik.errors.phone && formik.touched.phone && (
                                <p className="text-danger">{formik.errors.phone} </p>
                            )}
                        </ul>
                    </div>
                </form>
                <MDBRow className="justify-content-center">
                    <MDBBtn color='danger' className="text-border" onClick={()=>{
                        history.push('/thong-tin-ca-nhan')
                    }}>Hủy</MDBBtn>
                    <MDBBtn onClick={() => {
                        dispatch(editProfile(userid, formik.values));
                    }} color='success' className="text-bold">Cập nhật</MDBBtn>
                </MDBRow>

            </div>
        </div>
    );
};
