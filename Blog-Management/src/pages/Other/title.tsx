import React, { useState, useEffect }from 'react'
import style from './css/title.less'
import { getAllTitle, postTitle, deleteTitle } from '@/api'
import { Col, Card, Tag, Tooltip, Button, Select, Modal, Input, message } from 'antd'
import { connect } from 'umi'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'

interface Props {
    children?: any
    user?: any
}

const Component = (props: Props) => {

    const [titleList, setTitleList] = useState([])
    const [titleKey, setTitleKey] = useState(1)
    const [titleText, setTitleText] = useState('')
    const [lock, setLock] = useState(false)

    useEffect(() => {
        getAllTitle(props.user.spreadCode).then(resp => {
            setTitleList(resp.data.data.rows)
            if (resp.data.data.rows.length > 0) {
                setTitleKey(resp.data.data.rows[0].id)
            }
        })
    }, [lock])

    const vNode = titleList.map((item: any) => {
        return (
            <div className={style['title-item']} key={item.id}>
                <Tooltip title={`标签ID: ${item.id}`}>
                    <Tag>{item.title}</Tag>
                </Tooltip>
            </div>
        )
    })

    const vOptions = titleList.map((item: any) => {
        return (
            <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
        )
    })

    return (
        <div className={style['card-container']}>
            <Card
                className={style['card-left']}
                hoverable
                title="标语列表"
            >
                {vNode}
            </Card>
            <Card
                className={style['card-right']}
                hoverable
                title="标语操作"
            >
                <Card
                    className={style['card']}
                    hoverable
                    title="新增标语"
                >
                    <Button
                        className={style['card-button']}
                        type='primary'
                        icon={<UploadOutlined />}
                        onClick={() => {
                            if (!titleText) return message.error('标语内容不能为空!')
                            postTitle({
                                text: titleText,
                                uid: props.user.spreadCode
                            }).then((resp: any) => {
                                if (resp. data.state === 'success') {
                                    message.success('新增成功')
                                    setTitleText('')
                                    setLock(!lock)
                                } else {
                                    message.error('新增失败')
                                }
                            })
                        }}
                    >保存</Button>
                    <Card
                        className={style['card']}
                        hoverable
                    >
                        <Col className={style.span}>标语文本:</Col>
                        <Col className={style['card-col']}>
                            <Input
                                className={style.input}
                                value={titleText}
                                onChange={(e) => {
                                    setTitleText(e.target.value)
                                }}
                                allowClear
                            />
                        </Col>
                    </Card>
                </Card>
                <Card
                    className={style['card']}
                    hoverable
                    title="删除标语"
                >
                    <Button
                        className={style['card-button']}
                        type='primary'
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            Modal.confirm({
                                title: '删除确认',
                                content: `是否确定删除该标语?`,
                                onOk() {
                                    deleteTitle({
                                        id: titleKey,
                                        uid: props.user.spreadCode
                                    }).then((resp: any) => {
                                        if (resp. data.state === 'success') {
                                            message.success('删除成功')
                                            setTitleText('')
                                            setLock(!lock)
                                        } else {
                                            message.error('删除失败')
                                        }
                                    })
                                },
                                cancelText: '取消',
                                okText: '确定'
                            })
                        }}
                    >删除</Button>
                    <Card
                        className={style['card']}
                        hoverable
                    >
                        <Col className={style.span}>目标标语:</Col>
                        <Col className={style['card-col']}>
                            <Select
                                value={titleKey}
                                className={style.input}
                                onChange={(key) => {
                                    setTitleKey(key)
                                }}
                            >
                                {vOptions}
                            </Select>
                        </Col>
                    </Card>
                </Card>
            </Card>
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component);