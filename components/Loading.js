
import { Lato } from 'next/font/google'
import { useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 50,
            color: '#fff',
        }}
        spin
    />
);
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})

export default function Loading() {

    return (
        <div className='loadingConteiner'>
            <img src='/MLogo.svg' style={{ width: '15%', marginBottom: "1%" }} />
            <Spin indicator={antIcon} />
        </div>
    )
}
