import React from 'react'
import { Result, Button } from 'antd';
import { history } from '../../App';

export default function PageNotFound() {
    return (
        <div>
            <Result
                status="404"
                title={<h1 style={{ color: 'white' }}>404</h1>}
                subTitle={<p style={{ color: 'white' }}>Sorry, the page you visited does not exist.</p>}
                extra={<Button type="primary" onClick={() => {
                    history.push('/')
                }}>Back Home</Button>}
            />
        </div>
    )
}
