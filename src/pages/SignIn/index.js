
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
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
                                <MDBContainer>
                                    <div className={styles.wrapper_header}>
                                        <img class={styles.wrapper_header_logo} src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png" />
                                        <h2 className={cx(styles.wrapper_title, "my-3")}>Đăng nhập</h2>
                                    </div>
                                    <div className={styles.wrapper_form}>
                                        <form>
                                            <div className="grey-text">
                                                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                                    success="right" />
                                                <MDBInput label="Type your password" icon="lock" group type="password" validate />
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn className="w-100">Login</MDBBtn>
                                            </div>
                                        </form>
                                    </div>
                                </MDBContainer>
                            </MDBCol>

                            <MDBCol md="6">
                                <div className={styles.shape}></div>
                                <div className={styles.bg_img}>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    };
}

export default SignIn;