
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import styles from "./style.module.scss";
import cx from 'classnames';
import { render } from "@testing-library/react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import OtpInput from "react-otp-input";
import { quenMatKhau } from "../../redux/actions/NguoiDungAction";
import { useDispatch } from "react-redux";
=======
import {Link} from "react-router-dom";
>>>>>>> 9cdf68cad986416ac005bd3293e8029c943e2cda

export default function ForgotPassword() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
        }),
        onSubmit: values => {
            dispatch(quenMatKhau(values));
            // console.log('value', values)
        }

    });


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
                                    <img className={styles.wrapper_header_logo} src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png" />
                                    <h2 className={cx(styles.wrapper_title, "my-3 text-center")}>Quên mật khẩu</h2>
                                </div>
                                <div className={styles.wrapper_form}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grey-text">
                                            <MDBInput name="email" label="Email" icon="envelope" group type="email" validate error="wrong"
                                                success="right" onChange={formik.handleChange} />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn type="submit" color="primary" className="w-100">Nhận mã xác nhận</MDBBtn>
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
}