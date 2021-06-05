import React, { Fragment } from "react";
import Header from "../../components/Header";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    return (
        <Fragment>
                <Header/>
                {children}
        </Fragment>
    )
}

