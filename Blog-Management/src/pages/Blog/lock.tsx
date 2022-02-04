import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import style from './css/lock.less'
import { history } from 'umi'
import ManageHeader from '@/components/ManageHeader';
import { IRenderData } from '@/types/interfaces';

const Component:React.FC = () => {
    const blogMessage: any = history.location.state
    const [html, setHtml] = useState('')

    useEffect(() => {
        if (blogMessage) {
            setHtml(blogMessage.htmlText);
        }
    }, [])

    const renderData: IRenderData[] = [
        {
            path: '',
            name: '返回',
            icon: <RollbackOutlined />,
            onClick: () => {
                history.push('/blog/list');
            }
        }
    ];

    return (
        <div className={style['put-container']}>
            <ManageHeader renderData={renderData}/>
            <Card>
                <div
                    className={style['card-html-text']}
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </Card>
        </div>
    )
}

export default Component
