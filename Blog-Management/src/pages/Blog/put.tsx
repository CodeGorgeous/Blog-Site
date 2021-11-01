import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Card, Button, message } from 'antd'
import style from './put.less'
import { FileSearchOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { history } from 'umi' 
import { putBlog, getBlog } from '@/api/blog'

const Component: React.FC = () => {
    const blogMessage: any = history.location.state

    const [id, setId] = useState('')
    const [text, setText] = useState('')
    const [lock, setLock] = useState(false)

    useEffect(() => {
        if (blogMessage) {
            setId(blogMessage.id)
            setText(blogMessage.markdownText),
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
                                        setText(resp.data.data.markdownText)
                                        setLock(true)
                                        message.success('查询成功')
                                    } else {
                                        message.error(resp.data.msg)
                                    }
                                })
                            }}
                        >查询</Button>
                    </Col>
                    <Col style={{
                        display: lock ? 'flex' : 'none'
                    }}>
                        <Button
                            className={style['card-button']}
                            type={"primary"}
                            icon={<CloudUploadOutlined />}
                            onClick={() => {
                                putBlog({
                                    id: blogMessage.id ? blogMessage.id : +id,
                                    text
                                }).then(resp => {
                                    if (resp.data.state === 'success') {
                                        message.success('修改成功')
                                        history.push('/blog/list')
                                    } else {
                                        message.error(resp.data.msg)
                                    }
                                })
                            }}
                        >保存</Button>
                    </Col>
                </Row>
            </Card>
            <Card
                className={`${style['card']} ${style['card-text-container']}`}
                style={{
                    display: lock ? 'inline-block' : 'flex'
                }}
            >
                <Input.TextArea
                    className={style['card-textArea']}
                    value={text}
                    showCount={true}
                    style={{
                        display: lock ? 'block' : 'none'
                    }}
                    onChange={e => setText(e.target.value)}
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
