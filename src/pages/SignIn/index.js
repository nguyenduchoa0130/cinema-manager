
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBListGroupItem, MDBListGroup } from 'mdbreact';
import {Link} from "react-router-dom";
import styles from "./style.module.scss";
import cx from 'classnames';

class SignIn extends React.Component {
    render() {
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
                                        <img class={styles.wrapper_header_logo} src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png" />
                                        <h2 className={cx(styles.wrapper_title, "my-3 text-center")}>Đăng nhập</h2>
                                    </div>
                                    <div className={styles.wrapper_form}>
                                        <form>
                                            <div className="grey-text">
                                                <MDBInput label="Nhập email" icon="envelope" group type="email" validate error="wrong"
                                                    success="right" />
                                                <MDBInput label="Nhập mật khẩu" icon="lock" group type="password" validate />
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn className="w-100">Đăng nhập</MDBBtn>
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
        );
    };
}

export default SignIn;