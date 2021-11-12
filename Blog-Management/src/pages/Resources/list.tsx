import React, { useState, useEffect } from 'react'
import { Row, Col, Collapse, Card, Image, Tag, Tooltip, Button, Modal, message } from 'antd'
import { getAllResourcesType, getResources } from '@/api'
import style from './css/list.less'
import { ToolOutlined, DeleteOutlined } from '@ant-design/icons'
import { history, connect } from 'umi'

const { Panel  } = Collapse
const { confirm } = Modal

interface Props {
    children?: any
    user?: any
}

const Component = (props: Props) => {

    const [text, setText] = useState('Hello Umi!')
    const [list, setList] = useState([])

    useEffect(() => {
        getAllResourcesType().then(resp => {
            setList(resp.data.data)
        })
        return () => {
            
        }
    }, [])

    const vNode = list.map((item: any) => {
        let vNode: any = [];
        if (item.ResourcesTypes.length > 0) {
            item.ResourcesTypes.forEach(async (it: any) => {
                // 拿取资源
                const data = await getResources(it.id).then(resp => resp.data.data)
                const nodeList = data.map((t: any) => {
                    // 处理标签
                    const tagsNode = t.tags.split('|').map((i: any, index: number) => {
                        return <Tag key={index}>{i}</Tag>
                    })
                    return (
                        <Card
                            className={style.card}
                            key={t.id}
                            hoverable={true}
                        >
                            <Row className={style['card-box']}>
                                <Col
                                    className={style['card-left']}
                                >
                                    <Image
                                        width={150}
                                        src={t.image}
                                    />
                                </Col>
                                <Col
                                    className={style['card-right']}
                                >
                                    <p>资源名: {t.name}</p>
                                    <p className={style['card-introduce']}>资源描述: {t.introduce}</p>
                                    <p>资源地址: <a href={t.url}>{t.url}</a></p>
                                    <p>标签: {tagsNode}</p>
                                    <p>
                                        操作: <Tooltip placement="top" title="修改">
                                            <Button
                                                className={style['card-button']}
                                                icon={<ToolOutlined />}
                                                type="primary"
                                                ghost
                                                size="small"
                                                onClick={() => {
                                                    history.push('/resources/alterResources', t)
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
                                                        content: `是否确定删除${t.name}这个资源?`,
                                                        onOk() {
                                                            console.log('删除成功')
                                                        },
                                                        cancelText: '取消',
                                                        okText: '确定'
                                                    })
                                                }}
                                            />
                                        </Tooltip>
                                    </p>
                                </Col>
                            </Row>
                        </Card>
                    )
                })
                
                const node = (
                    <Collapse key={it.id}>
                        <Panel
                            header={it.resourcesName}
                            key={it.id}
                            className={style.panel}
                        >
                            { nodeList }
                        </Panel>
                    </Collapse>
                )
                vNode.push(node)
            })
        }
        return (
            <Panel header={item.type} key={item.id}>
                {vNode}
            </Panel>
        )
    })


    return (
        <Row>
            <Collapse
                className={style['collapse-container']}
            >
                {vNode}
            </Collapse>
        </Row>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component);