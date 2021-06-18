import React, { Fragment } from "react";
import Header from "../../components/Header";
import { Layout } from 'antd';

const { Footer, Content } = Layout;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    return (
        <Layout>
            <Header />
            <Content>{children}</Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}

