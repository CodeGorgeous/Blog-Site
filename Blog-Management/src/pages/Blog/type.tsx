import React, { useState, useEffect } from 'react'
import style from './css/type.less'
import { Col, Card, Button, Input, message, Select, Modal } from 'antd'
import { postBlogType, getBlogType, putBlogType, deleteBlogType } from '../../api/index'
import { connect } from 'umi'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
    user?: any
    children?: any
}

const Component = (props: Props) => {

    const [typeList, setTypeList] = useState<any>([])
    const [typeName, setTypeName] = useState('')
    const [typeNameTwo, setTypeNameTwo] = useState('')
    const [blogKey, setBlogKey] = useState(1)
    const [blogKeyTwo, setBlogKeyTwo] = useState(1)
    const [lock, setLock] = useState(false)

    useEffect(() => {
        getBlogType().then(resp => {
            setTypeList(resp.data.data)
            if (resp.data.data.length > 0) {
                setBlogKey(resp.data.data[0].id)
                setBlogKeyTwo(resp.data.data[0].id)
            }
        })
    }, [lock])

    const vNode = typeList.map((item: any) => {
        return (<Select.Option value={item.id} key={item.id}>{item.typeName}</Select.Option>)
    })

    return (
        <div>
            <Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={() => {
                                if (!typeName) return message.error('分类名称不能为空!')
                                const data = {
                                    typeName,
                                    uid: props.user.spreadCode
                                }
                                postBlogType(data).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setTypeName('')
                                        return message.success('新增成功!')
                                    }
                                    return message.error('新增失败!')
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col>
                            <span className={style['card-span']}>
                                分类名称:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={typeName}
                                onChange={e => {
                                    setTypeName(e.target.value)
                                }}
                            />
                        </Col>
                    </Card>
                </Col>
            </Card>
            <Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={() => {
                                if (!typeNameTwo) return message.error('分类名称不能为空!')
                                putBlogType({
                                    typeId: blogKey,
                                    name: typeNameTwo,
                                    uid: props.user.spreadCode
                                }).then((resp: any) => {
                                    if (resp.data.state === 'success') {
                                        message.success('修改成功!')
                                        setTypeNameTwo('')
                                        setLock(!lock)
                                    } else {
                                        message.error('修改失败!')
                                    }
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                目标分类:
                            </span>
                            <Select
                                value={blogKey}
                                className={style['card-input']}
                                onChange={(key) => {
                                    setBlogKey(key)
                                }}
                            >
                                {vNode}
                            </Select>
                        </Col>
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                分类名称:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={typeNameTwo}
                                onChange={e => {
                                    setTypeNameTwo(e.target.value)
                                }}
                            />
                        </Col>
                    </Card>
                </Col>
            </Card>
            <Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            danger
                            icon={<UploadOutlined />}
                            onClick={() => {
                                Modal.confirm({
                                    title: '删除确认',
                                    content: `是否确定删除该分类?`,
                                    onOk() {
                                        deleteBlogType({
                                            id: blogKeyTwo,
                                            uid: props.user.spreadCode
                                        }).then((resp: any) => {
                                            if (resp.data.state === 'success') {
                                                message.success('修改成功!')
                                                setLock(!lock)
                                            } else {
                                                message.error(resp.data.msg)
                                            }
                                        })
                                    },
                                    cancelText: '取消',
                                    okText: '确定'
                                })
                            }}
                        >
                            删除
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                目标分类:
                            </span>
                            <Select
                                value={blogKeyTwo}
                                className={style['card-input']}
                                onChange={(key) => {
                                    setBlogKeyTwo(key)
                                }}
                            >
                                {vNode}
                            </Select>
                        </Col>
                    </Card>
                </Col>
            </Card>
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);