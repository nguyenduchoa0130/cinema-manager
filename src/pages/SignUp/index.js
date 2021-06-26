
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import cx from 'classnames';
import { Link, Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { dangKyAction } from "../../redux/actions/NguoiDungAction";
import { useDispatch } from "react-redux";
import { USERLOGIN } from "../../util/constants/settingSystem";
import logo from "../../assets/images/logo.svg"

export default function SignUp() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            password: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(6, "Minimum 6 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            fullName: Yup.string().min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            phone: Yup.string().min(9, "Mininum 9 characters")
                .max(11, "Maximum 11 characters")
                .required("Required!"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: values => {
            dispatch(dangKyAction(values))
            // console.log('value', values);
        }
    });

    let isSuccess = '';
    if (localStorage.getItem(USERLOGIN)) {
        let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
        isSuccess = userLogin.isSuccess;
        if (isSuccess === true) {
            return <Redirect to="/kich-hoat" />
        } else {
            return <Redirect to="/dang-ky" />
        }
    }

    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <MDBContainer>
                    <MDBRow className={styles.row_full_screen}>
                        <MDBCol md="6">
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
                                    <h2 className={cx(styles.wrapper_title, "my-3 text-center")}>Đăng ký</h2>
                                </div>
                                <div className={styles.wrapper_form}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grey-text">
                                            <MDBInput name="fullName" id="fullName" label="Họ tên" icon="user" group type="text" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.fullName && formik.touched.fullName && (
                                                <p className="text-danger">{formik.errors.fullName} </p>
                                            )}
                                            <MDBInput name="email" id="email" label="Email" icon="envelope" group type="email" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.email && formik.touched.email && (
                                                <p className="text-danger">{formik.errors.email} </p>
                                            )}
                                            <MDBInput name="phone" id="phone" label="Số điện thoại" icon="mobile" group type="text" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.phone && formik.touched.phone && (
                                                <p className="text-danger">{formik.errors.phone} </p>
                                            )}
                                            <MDBInput name="password" id="password" label="Mật khẩu" icon="lock" group type="password" validate onChange={formik.handleChange} />
                                            {formik.errors.password && formik.touched.password && (
                                                <p className="text-danger">{formik.errors.password} </p>
                                            )}
                                            <MDBInput name="passwordConfirm" id="passwordConfirm" label="Mật khẩu xác thực" icon="exclamation-triangle" group type="password" validate onChange={formik.handleChange} />
                                            {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                                                <p className="text-danger">{formik.errors.passwordConfirm} </p>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn type="submit" color="primary" className="w-100">Đăng ký</MDBBtn>
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
