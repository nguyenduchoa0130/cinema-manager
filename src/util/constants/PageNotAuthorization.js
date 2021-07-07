import React from 'react'
import { Result, Button } from 'antd';
import { history } from '../../App';
export default function PageNotAuthorization() {
    return (
        <div>
            <Result

                status="403"
                title={<h1 style={{ color: 'white' }}>403</h1>}
                subTitle={<p style={{ color: 'white' }}>Sorry, you are not authorized to access this page.</p>}
                extra={<Button type="primary" onClick={() => {
                    history.push('/')
                }}>Back Home</Button>}
            />
        </div>
    )
}
