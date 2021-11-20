import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Input, Button, Select, DatePicker, Modal, message, Tooltip } from 'antd'
import style from './css/add.less'
import { CloudUploadOutlined, CloudSyncOutlined, ToolOutlined } from '@ant-design/icons'
import { history, connect } from 'umi'
import moment from 'moment'
import { postBlog, getBlogType } from '@/api/index'

interface Props {
    children?: any
    user?: any
}

const { confirm } = Modal;

const Component: React.FC = (props: Props) => {
    // 博客所有分类
    const [typeList, setTypeList] = useState<any>([])
    // 博客信息
    const [blogName, setBlogName] = useState('')
    const [blogTimer, setBlogTimer] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [sourceCodeUrl, setSourceCodeUrl] = useState('')
    const [blogTags, setBlogTags] = useState<any[]>([])
    const [blogText, setBlogText] = useState('')
    const [blogIntroduce, setBlogIntroduce] = useState('')
    const [blogKey, setBlogKey] = useState(1)

    useEffect(() => {
        getBlogType().then(resp => {
            setTypeList(resp.data.data)
        })
    }, [])

    const vNode = typeList.map((item: any) => {
        return (<Select.Option value={item.id} key={item.id}>{item.typeName}</Select.Option>)
    })

    return (
        <Row className={style['add-container']}>
            <Card className={style.card} hoverable>
                <Button
                    icon={<CloudUploadOutlined />}
                    className={style.button}
                    type={"primary"}
                    onClick={() => {
                        if (props.user.powerLevel <= 1) return message.error('新增失败: 用户权限不足')
                        const blog = {
                            name: blogName,
                            timer: blogTimer,
                            url: blogUrl,
                            author: blogAuthor,
                            codeUrl: sourceCodeUrl,
                            tags: blogTags.join('|'),
                            text: blogText,
                            uid: props.user.spreadCode,
                            introduce: blogIntroduce,
                            typeId: blogKey
                        }
                        console.log(blog)
                        postBlog(blog).then(resp => {
                            if (resp.data.state === 'success') {
                                message.success('新增成功')
                                history.push('/blog/list')
                                setBlogName('')
                                setBlogTimer('')
                                setBlogUrl('')
                                setBlogAuthor('')
                                setSourceCodeUrl('')
                                setBlogTags([])
                                setBlogText('')
                                setBlogIntroduce('')
                            } else {
                                message.success('新增失败, 请重新尝试')
                            }
                        })
                    }}
                >保存</Button>
                <Button
                    icon={<CloudSyncOutlined />}
                    className={style.button}
                    type={"primary"}
                    danger
                    onClick={() => {
                        const config = {
                            title: '确定重置所有内容?',
                            centered: true,
                            cancelText: '取消',
                            okText: '确定',
                            onOk: () => {
                                setBlogName('')
                                setBlogTimer('')
                                setBlogUrl('')
                                setBlogAuthor('')
                                setSourceCodeUrl('')
                                setBlogTags([])
                                setBlogText('')
                            }
                        }
                        confirm(config)
                    }}
                >重置</Button>
            </Card>
            <Card
                className={style.card}
                hoverable
                style={{
                    marginTop: '15px'
                }}
            >
                <Row className={style.row}>
                    <Col className={style.span}>文章分类:</Col>
                    <Col >
                        <Select
                            defaultValue={blogKey}
                            className={style.input}
                            onChange={(key) => {
                                setBlogKey(key)
                            }}
                        >
                            {vNode}
                        </Select>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章名称:</Col>
                    <Col className={style.input}><Input value={blogName} onChange={e => setBlogName(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章描述:</Col>
                    <Col className={style.input}><Input value={blogIntroduce} onChange={e => setBlogIntroduce(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章时间:</Col>
                    <Col>
                        <DatePicker
                            className={style.input}
                            format={'YYYY-MM-DD'}
                            placeholder={""}
                            value={blogTimer ? moment(blogTimer, 'YYYY-MM-DD') : null}
                            onChange={(date, dateString) => {
                                setBlogTimer(dateString)
                            }}
                        />
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>展示图url:</Col>
                    <Col className={style.input}><Input allowClear={true} value={blogUrl} onChange={e => setBlogUrl(e.target.value)}/></Col>
                    <Col>
                        <Tooltip placement="top" title="使用账户默认图片">
                            <Button
                                className={style['input-tip']}
                                icon={<ToolOutlined />}
                                onClick={() => {
                                    setBlogUrl(props.user.imgUrl)
                                }}
                            />
                        </Tooltip>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章作者:</Col>
                    <Col className={style.input}><Input allowClear={true} value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)}/></Col>
                    <Col>
                        <Tooltip placement="top" title="使用用户名">
                            <Button
                                className={style['input-tip']}
                                icon={<ToolOutlined />}
                                onClick={() => {
                                    setBlogAuthor(props.user.name)
                                }}
                            />
                        </Tooltip>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>源码地址:</Col>
                    <Col className={style.input}><Input allowClear={true} value={sourceCodeUrl} onChange={e => setSourceCodeUrl(e.target.value)}/></Col>
                    <Col>
                        <Tooltip placement="top" title="使用默认设置">
                            <Button
                                className={style['input-tip']}
                                icon={<ToolOutlined />}
                                onClick={() => {
                                    setSourceCodeUrl('暂无')
                                }}
                            />
                        </Tooltip>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章标签:</Col>
                    <Col>
                        <Select
                            mode="tags"
                            className={style.input}
                            onSelect={(key) => {
                                setBlogTags([...blogTags, key])
                            }}
                            onDeselect={(key) => {
                                let tags = [...blogTags]
                                tags.splice(tags.indexOf(key), 1)
                                setBlogTags([...tags])
                            }}
                        >
                        </Select>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章内容:</Col>
                    <Col className={style['card-textArea-container']}>
                        <Input.TextArea
                            className={style['card-textArea']}
                            value={blogText}
                            showCount={true}
                            onChange={(e) => {
                                setBlogText(e.target.value)
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => {return {}})(Component)
