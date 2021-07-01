
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import cx from 'classnames';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { USERLOGIN } from "../../util/constants/settingSystem";
import { xacNhanOtp } from "../../redux/actions/NguoiDungAction";
import logo from "../../assets/images/logo.svg"
// import OtpInput from "react-otp-input";

export default function Activated() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required("Required!"),
        }),
        onSubmit: values => {
            dispatch(xacNhanOtp(values, userId));
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
                                    <img className={styles.wrapper_header_logo} src={logo}  alt="logo"/>
                                     <h2 className={cx(styles.wrapper_title, "my-3 text-center text-white")}>Xác nhận OTP</h2>
                                </div>
                                <div className={styles.wrapper_form}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className={cx(styles.otp_group, "grey-text")}>
                                            <MDBInput label="OTP" name="code" type="text" icon="mobile" group validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                            {formik.errors.code && formik.touched.code && (
                                                <p className="text-danger">{formik.errors.code} </p>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn type="submit" color="primary" className="w-100">Xác nhận</MDBBtn>
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
