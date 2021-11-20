import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Image, Tag, Button, Modal, Tooltip, message } from 'antd'
import style from './css/list.less'
import { DeleteOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'
import { getAllBlogs, deleteBlog } from '@/api/blog'
import { history, connect } from 'umi'

const { confirm } = Modal;

interface Props {
    user?: any
    children?: any
}

const Component: React.FC = (props: Props) => {

    const [data, setData] = useState([])
    const [lock, setLock] = useState(false)

    useEffect(() => {
        getAllBlogs().then(resp => {
            setData(resp.data.data.list)
        })
    }, [lock])

    // 这里需要拿到列表数据
    const list = data.map((item: any, index: number) => {

        const newTags = item.tags.split('|').map((it: any, index: number) => {
            return <Tag key={index}>{it}</Tag>
        })
        return (<Card key={item.id} hoverable className={style.card}>
            <Row className={style.row}>
                <Col className={style['card-left']}>
                    <Image className={style['card-image']} width={200} height={200} src={item.occupyImg}/>
                </Col>
                <Col className={style['card-right']}>
                    <Row>
                        <Col className={`${style['card-col']} ${style['card-title']}`}>{item.name}</Col>
                        <Col className={`${style['card-col']} ${style['card-id']}`}>文章编号: {item.id}</Col>
                        <Col className={`${style['card-col']} ${style['card-timer']}`}>发布时间: {item.createTimer}</Col>
                        <Col className={`${style['card-col']} ${style['card-author']}`}>作者: {item.author}</Col>
                        <Col className={`${style['card-col']} ${style['card-codeUrl']}`}>源码地址: <a href={item.githubUrl === '暂无' ? '#' : item.githubUrl}>{item.githubUrl}</a></Col>
                        <Col className={`${style['card-col']} ${style['card-tags']}`}>
                            标签: {newTags}
                        </Col>
                        <Col className={`${style['card-col']}`}>
                            操作: <Tooltip placement="top" title="查看">
                                <Button
                                    className={style['card-button']}
                                    icon={<SearchOutlined />}
                                    type={"primary"}
                                    ghost
                                    size="small"
                                    onClick={() => {
                                        history.push('/blog/lock', item)
                                    }}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="修改">
                                <Button
                                    className={style['card-button']}
                                    icon={<ToolOutlined />}
                                    type="primary"
                                    ghost
                                    size="small"
                                    onClick={() => {
                                        history.push('/blog/put', item)
                                    }}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="删除">
                                <Button
                                    className={style['card-button']}
                                    icon={<DeleteOutlined />}
                                    type={"primary"}
                                    ghost
                                    danger
                                    size="small"
                                    onClick={() => {
                                        if (props.user.powerLevel <= 1) return message.error('删除失败: 用户权限不足')
                                        confirm({
                                            title: '删除确认',
                                            content: `是否确定删除${item.name}这篇文章?`,
                                            onOk() {
                                                deleteBlog({
                                                    id: item.id,
                                                    uid: props.user.spreadCode
                                                }).then(resp => {
                                                    if (resp.data.state === 'success') {
                                                        setLock(!lock)
                                                        message.success('删除成功')
                                                    } else {
                                                        message.error(resp.data.msg)
                                                    }
                                                })
                                            },
                                            cancelText: '取消',
                                            okText: '确定'
                                        })
                                    }}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>)
    })

    return (
        <div className={style['list-container']}>
            {list}
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component)
