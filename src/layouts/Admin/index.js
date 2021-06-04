import React from "react";
import { MDBContainer, MDBRow } from 'mdbreact';
import styles from "./style.module.scss";
import SideNav from '../../components/SideNav'


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    return (
        <MDBContainer fluid className={styles.wrapper}>
            <MDBRow >
                <div className="p-0">
                    <SideNav />
                </div>
                <MDBContainer fluid className={styles.wrapper_content}>
                    {children}
                </MDBContainer>
            </MDBRow>
        </MDBContainer>
    )
}

