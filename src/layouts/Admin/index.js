import React from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import styles from "./style.module.scss";
import SideNav from '~/components/SideNav'


export default ({ children }) => {

    console.log('render Main Admin')

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

