import React from 'react'
import { useSelector } from 'react-redux'
import './Loading.css'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className="bgLoading">
                <Spin indicator={antIcon} />
            </div>
        )
    } else {
        return ''
    }
}
