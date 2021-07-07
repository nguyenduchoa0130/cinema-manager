import React from 'react'
import { useSelector } from 'react-redux'
import './Loading.css'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className="bgLoading">
                <div className="loading"></div>
            </div>
        )
    } else {
        return ''
    }
}
