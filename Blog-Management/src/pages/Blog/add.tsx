import React, { useState } from 'react'
import { Card, Row, Col, Input, Button, Select, DatePicker, Modal } from 'antd'
import style from './add.less'
import { CloudUploadOutlined, CloudSyncOutlined } from '@ant-design/icons'
import moment from 'moment'
import { postBlog } from '@/api/blog'

const Component: React.FC = () => {

    const [blogName, setBlogName] = useState('')
    const [blogTimer, setBlogTimer] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [sourceCodeUrl, setSourceCodeUrl] = useState('')
    const [blogTags, setBlogTags] = useState<any[]>([])
    const [blogText, setBlogText] = useState('')

    const { confirm } = Modal;


    return (
        <Row>
            <Card className={style.card} hoverable>
                <Button
                    icon={<CloudUploadOutlined />}
                    className={style.button}
                    type={"primary"}
                    onClick={() => {
                        const blog = {
                            name: blogName,
                            timer: blogTimer,
                            url: blogUrl,
                            author: blogAuthor,
                            codeUrl: sourceCodeUrl,
                            tags: blogTags.join('|'),
                            text: blogText
                        }
                        postBlog(blog).then(resp => {
                            console.log(resp)
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
                    <Col className={style.span}>文章名称:</Col>
                    <Col className={style.input}><Input value={blogName} onChange={e => setBlogName(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章时间:</Col>
                    <Col>
                        <DatePicker
                            className={style.input}
                            format={'YYYY-MM-DD'}
                            value={blogTimer ? moment(blogTimer, 'YYYY-MM-DD') : null}
                            onChange={(date, dateString) => {
                                setBlogTimer(dateString)
                            }}
                        />
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>展示图url:</Col>
                    <Col className={style.input}><Input value={blogUrl} onChange={e => setBlogUrl(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章作者:</Col>
                    <Col className={style.input}><Input value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>源码地址:</Col>
                    <Col className={style.input}><Input value={sourceCodeUrl} onChange={e => setSourceCodeUrl(e.target.value)}/></Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章标签:</Col>
                    <Col>
                        <Select
                            mode="tags"
                            className={style.input}
                            // value={blogTags}
                            onSelect={(key) => {
                                setBlogTags([...blogTags, key])
                            }}
                            onDeselect={(key) => {
                                let tags = [...blogTags]
                                tags.splice(tags.indexOf(key), 1)
                                setBlogTags([...tags])
                            }}
                        >
                            <Select.Option value={'JavaScript'}>JavaScript</Select.Option>
                            <Select.Option value={'学习笔记'}>学习笔记</Select.Option>
                            <Select.Option value={'技术深入探究'}>技术深入探究</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row className={style.row}>
                    <Col className={style.span}>文章内容:</Col>
                    <Col
                        className={style.input}
                        style={{
                            width: '800px'
                        }}
                    >
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

export default Component
