import React, { useState } from 'react'
import { Input, Row, Col, Card, Button } from 'antd'
import style from './put.less'
import { FileSearchOutlined, CloudUploadOutlined } from '@ant-design/icons'

const Component: React.FC = () => {

    const [id, setId] = useState('')
    const [text, setText] = useState('')
    const [lock, setLock] = useState(false)

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
                                setLock(true)
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
                    请先搜索博客内容
                </span>
            </Card>
        </div>
    )
}

export default Component
