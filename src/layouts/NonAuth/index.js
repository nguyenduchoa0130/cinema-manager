import React, { Fragment } from "react";
import styles from "./style.module.scss";
import Header from "../../components/Header";


export default ({ children }) => {
    return (
        <Fragment>
                <Header/>
                {children}
        </Fragment>
    )
}

