import React from "react";
import Header from "../../components/Header";
import { Layout } from 'antd';

const {  Content } = Layout;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    return (
        <Layout>
            <Header />
            <Content>{children}</Content>
        </Layout>
    )
}

