
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import styles from "./style.module.scss";

const Home = () => {
    return (
        <div className={styles.wrapper_template}>
            <div className={styles.wrapper_content}>
                <MDBContainer>
                    <MDBRow className={styles.row_full_screen}>
                        <MDBCol>
                            <h1>Chào mừng đến với trang chủ</h1>
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};

export default Home;