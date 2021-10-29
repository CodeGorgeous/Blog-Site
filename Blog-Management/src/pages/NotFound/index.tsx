import React from 'react'
import style from './index.less'
import { Button } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import { history } from 'umi'

export default function index() {
    return (
        <div className={style['notfound-container']}>
            <div>
                <img src="http://qiniu.codegorgeous.top/404.webp" alt="" />
                <p><Button
                        icon={<BankOutlined />}
                        onClick={() => {
                            history.push('/')
                        }}
                    >返回</Button></p>
            </div>
        </div>
    )
}
