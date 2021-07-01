
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import cx from 'classnames';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { matKhauMoi } from "../../redux/actions/NguoiDungAction";
import { USERLOGIN } from "../../util/constants/settingSystem";
import logo from "../../assets/images/logo.svg"

export default function ChangePassword() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            new_password: '',
        },
        validationSchema: Yup.object().shape({
            new_password: Yup.string().min(6, "Minimum 6 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        }),
        onSubmit: values => {
            dispatch(matKhauMoi(values, userId));
            
        }

    });
    let userId = '';
    if (localStorage.getItem(USERLOGIN)) {
        let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
        userId = userLogin.userId;
    }
    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <MDBContainer>
                    <MDBRow className={styles.row_full_screen}>
                        <MDBCol md="6" className={styles.bg_left}>
                            <div className={styles.shape}></div>
                            <div className={styles.bg_img}>
                            </div>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBContainer>
                                <div className={styles.wrapper_header}>
                                    <div >
                                        <Link to="/dang-nhap">
                                            <MDBIcon icon="long-arrow-alt-left" size="2x" />
                                        </Link>

                                    </div>
                                    <img className={styles.wrapper_header_logo} src={logo} alt="logo" />
                                     <h2 className={cx(styles.wrapper_title, "my-3 text-center text-white")}>Đổi mật khẩu</h2>
                                </div>
                                <div className={styles.wrapper_form}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grey-text">
                                            <MDBInput name="new_password" label="Mật khẩu mới" icon="lock" group type="password" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.new_password && formik.touched.new_password && (
                                                <p className="text-danger">{formik.errors.new_password} </p>
                                            )}
                                            <MDBInput name="passwordConfirm" label="Xác nhận lại mật khẩu mới " icon="lock" group type="password" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                                                <p className="text-danger">{formik.errors.passwordConfirm} </p>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn type="submit" color="primary" className="w-100">Lưu</MDBBtn>
                                        </div>
                                    </form>
                                </div>
                            </MDBContainer>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};
