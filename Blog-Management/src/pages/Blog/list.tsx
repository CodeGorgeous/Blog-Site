import React from 'react'
import { Card, Row, Col, Image, Tag, Button, Modal, Tooltip } from 'antd'
import style from './list.less'
import { DeleteOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'

// 模拟数据

const data = [
    {
        id: 1,
        name: '博客1',
        timer: '2021-10-21',
        url: 'http://qiniu.codegorgeous.top/login.webp',
        author: 'CodeGorgeous',
        codeUrl: 'http://qiniu.codegorgeous.top/login.webp',
        tags: ['Js', 'Css', 'Note'],
        text: '博客1内容'
    }, {
        id: 2,
        name: '博客2',
        timer: '2021-10-21',
        url: 'http://qiniu.codegorgeous.top/login.webp',
        author: 'CodeGorgeous',
        codeUrl: 'http://qiniu.codegorgeous.top/login.webp',
        tags: ['Js', 'Css', 'Note'],
        text: '博客2内容'
    }, {
        id: 3,
        name: '博客3',
        timer: '2021-10-21',
        url: 'http://qiniu.codegorgeous.top/login.webp',
        author: 'CodeGorgeous',
        codeUrl: 'http://qiniu.codegorgeous.top/login.webp',
        tags: ['Js', 'Css', 'Note'],
        text: '博客3内容'
    }
]

const { confirm } = Modal;

const Component: React.FC = () => {

    // 这里需要拿到列表数据
    const list = data.map((item, index) => {
        const newTags = item.tags.map((item, index) => {
            return <Tag key={index}>{item}</Tag>
        })
        return (<Card key={item.id} hoverable className={style.card}>
            <Row className={style.row}>
                <Col className={style['card-left']}>
                    <Image className={style['card-image']} width={200} height={200} src={item.url}/>
                </Col>
                <Col className={style['card-right']}>
                    <Row>
                        <Col className={`${style['card-col']} ${style['card-title']}`}>{item.name}</Col>
                        <Col className={`${style['card-col']} ${style['card-id']}`}>文章编号: {item.id}</Col>
                        <Col className={`${style['card-col']} ${style['card-timer']}`}>发布时间: {item.timer}</Col>
                        <Col className={`${style['card-col']} ${style['card-author']}`}>作者: {item.author}</Col>
                        <Col className={`${style['card-col']} ${style['card-codeUrl']}`}>源码地址: <a href={item.codeUrl}>{item.codeUrl}</a></Col>
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
                                        confirm({
                                            title: '删除确认',
                                            content: `是否确定删除${item.name}这篇文章?`,
                                            onOk() {
                                                console.log(`已经成功删除${item.id}博客`)
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

export default Component
