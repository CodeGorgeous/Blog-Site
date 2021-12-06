import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Card, Button, message, Select } from 'antd'
import style from './css/put.less'
import { FileSearchOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { history, connect } from 'umi' 
import { putBlog, getBlog, getBlogType } from '@/api'

interface Props {
    user?: any
    children?: any
}

const Component: React.FC = (props: Props) => {
    const blogMessage: any = history.location.state
    const [typeList, setTypeList] = useState<any>([])
    const [id, setId] = useState('')
    const [text, setText] = useState('')
    const [lock, setLock] = useState(false)
    const [blogKey, setBlogKey] = useState(1)

    useEffect(() => {
        if (blogMessage) {
            setId(blogMessage.id)
            setText(blogMessage.markdownText)
            setBlogKey(blogMessage.type_id)
            setLock(true)
        }
    }, [])

    useEffect(() => {
        getBlogType().then(resp => {
            setTypeList(resp.data.data)
        })
    }, [])

    const vNode = typeList.map((item: any) => {
        return (<Select.Option value={item.id} key={item.id}>{item.typeName}</Select.Option>)
    })

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
                                        setBlogKey(resp.data.data.type_id)
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
                                // 判断权限
                                if (props.user.powerLevel <= 1) { // 权限等级不满足
                                    return message.error('无法进行修改: 当前用户权限不足')
                                }
                                putBlog({
                                    id: blogMessage ? blogMessage.id : +id,
                                    uid: props.user.spreadCode,
                                    text,
                                    typeId: blogKey
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
                <Row className={style.row}>
                    <Col className={style.span}>文章分类:</Col>
                    <Col >
                        <Select
                            value={blogKey}
                            className={style.input}
                            onChange={(key) => {
                                setBlogKey(key)
                            }}
                        >
                            {vNode}
                        </Select>
                    </Col>
                </Row>
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

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => {
    return {}
})(Component)
