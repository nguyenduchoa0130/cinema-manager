
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBListGroupItem, MDBListGroup } from 'mdbreact';
import { Link, Redirect } from "react-router-dom";
import styles from "./style.module.scss";
import cx from 'classnames';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { TOKEN, USERLOGIN } from "../../util/constants/settingSystem";
import { dangNhapAction } from "../../redux/actions/NguoiDungAction";


export default function SingIn() {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Required!"),
            password: Yup.string().required("Required!"),
        }),
        onSubmit: values => {
            dispatch(dangNhapAction(values));
        },
    });
    if (localStorage.getItem(USERLOGIN)) {
        return <Redirect to="/" />
    }



    return (
        <div>
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
                                        <img className={styles.wrapper_header_logo} src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png" />
                                        <h2 className={cx(styles.wrapper_title, "my-3 text-center")}>Đăng nhập</h2>
                                    </div>
                                    <div className={styles.wrapper_form}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="grey-text">
                                                <MDBInput id="email" name="email" label="Nhập email" icon="envelope" group type="email" validate error="wrong"
                                                    success="right" onChange={formik.handleChange} />
                                                <MDBInput id="password" name="password" label="Nhập mật khẩu" icon="lock" group type="password" validate onChange={formik.handleChange} />
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn type="submit" className="w-100">Đăng nhập</MDBBtn>
                                            </div>
                                        </form>

                                        <p className="text-center">
                                            Bạn chưa có tài khoản ?
                                            <Link to="/dang-ky">
                                                Đăng ký
                                            </Link>
                                        </p>
                                        <p className="text-center">
                                            <Link to="/quen-mat-khau">
                                                Quên mật khẩu?
                                            </Link>
                                        </p>
                                        <p className="text-center">
                                            Hoặc đăng nhập bằng tài khoản
                                        </p>
                                        <div className="wapper_group_socialBtn">
                                            <MDBListGroup className={styles.list_group}>
                                                <MDBListGroupItem>
                                                    <div className="text-center">
                                                        <MDBBtn color="indigo" >Đăng nhập với Facebook</MDBBtn>
                                                    </div>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem>
                                                    <div className="text-center">
                                                        <MDBBtn color="red" >Đăng nhập với Google</MDBBtn>
                                                    </div>
                                                </MDBListGroupItem>
                                            </MDBListGroup>
                                        </div>
                                    </div>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        </div>
    )
}
