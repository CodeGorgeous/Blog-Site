import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Input, Button, message } from 'antd'
import { FileSearchOutlined } from '@ant-design/icons'
import style from './css/lock.less'
import { history } from 'umi'
import { getBlog } from '@/api/blog'

const Component:React.FC = () => {
    const blogMessage: any = history.location.state

    const [id, setId] = useState('')
    const [lock, setLock] = useState(false)
    const [html, setHtml] = useState('')

    useEffect(() => {
        if (blogMessage) {
            setId(blogMessage.id)
            setHtml(blogMessage.htmlText)
            setLock(true)
        }
    }, [])

    return (
        <div className={style['put-container']}>
            <Card className={style['card']}>
                <Row>
                    <Col>
                        <Input
                            className={style['card-input']}
                            value={id}
                            onChange={e => setId(e.target.value)}
                            placeholder="请输入博客Id"
                        />
                    </Col>
                    <Col>
                        <Button
                            className={style['card-button']}
                            type={"primary"}
                            icon={<FileSearchOutlined />}
                            onClick={() => {
                                if (typeof +id !== 'number') {
                                    message.error('请输入正确的博客id')
                                }
                                getBlog(+id).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setHtml(resp.data.data.htmlText)
                                        setLock(true)
                                        message.success('查询成功')
                                    } else {
                                        message.error(resp.data.msg)
                                    }
                                })
                            }}
                        >查询</Button>
                    </Col>
                </Row>
            </Card>
            <Card
                className={`${style['card']} ${style['card-text-container']}`}
                style={{
                    display: lock ? 'inline-block' : 'flex'
                }}
            >
                <div
                    className={style['card-html-text']}
                    dangerouslySetInnerHTML={{__html: html}}
                />
                <span
                    className={style['card-text']}
                    style={{
                        display: !lock ? 'inline-block' : 'none'
                    }}
                >
                    请先搜索博客
                </span>
            </Card>
        </div>
    )
}

export default Component
