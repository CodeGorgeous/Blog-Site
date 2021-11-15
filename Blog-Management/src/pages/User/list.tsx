import React, { useState, useEffect } from 'react'
import { Row, Col, Card, message, Image, Input, Button } from 'antd'
import style from './css/list.less'
import { getAllUser, searchUser } from '@/api/user'
import { history, connect } from 'umi'
import { SearchOutlined } from '@ant-design/icons'

interface Props {
    children?: any
    user?: any
}

const Component: React.FC = (props: Props) => {

    const [lock, setLock] = useState(false)
    const [list, setList] = useState([])
    const [keyWord, setKeyWord] = useState('')

    useEffect(() => {
        getAllUser(props.user.spreadCode).then(resp => {
            if (resp.data.state === 'success') {
                setList(resp.data.data.list)
            } else {
                message.error(`查询失败: ${resp.data.msg}`)
            }
        })
    }, [])

    const newList = list.map((item: any, index) => {
        return (
            <Card className={style['card-container']} key={index} hoverable>
                <Row>
                    <Col className={style['card-left']}>
                        <Image className={style['card-image']} width={150} height={150} src={item.occupyImgUrl}/>
                    </Col>
                    <Col className={style['card-right']}>
                        <Row>
                            <Col className={`${style['card-col']}`}>用户名: {item.name}</Col>
                            <Col className={`${style['card-col']}`}>用户编号: {item.id}</Col>
                            <Col className={`${style['card-col']}`}>创建时间: {item.createdAt.slice(0, 10)}</Col>
                            <Col className={`${style['card-col']}`}>权限等级: {item.powerLevel}</Col>                            
                            <Col
                                className={`${style['card-col']}`}
                                style={{
                                    display: item.code ? 'block' : 'none'
                                }}
                            >注册邀请码: {item.code}</Col>
                            <Col
                                className={`${style['card-col']}]}`}
                                style={{
                                    display: item.spreadCode ? 'block' : 'none'
                                }}
                            >专属邀请码: {item.spreadCode}</Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        )
    })

    return (
        <div className={style['user-list-container']}>
            <Row>
                <Card className={style['search-card']} hoverable>
                    <Col className={`${style['search-card-col']}`}>
                        <Input
                            className={style['search-input']}
                            placeholder={"请输入用户编号"}
                            value={keyWord}
                            onChange={e => {
                                setKeyWord(e.target.value)
                            }}
                        />
                    </Col>
                    <Col className={`${style['search-card-col']}`}>
                        <Button
                            type={"primary"}
                            icon={<SearchOutlined />}
                            className={`${style['search-btn']}`}
                            onClick={() => {
                                // 当输入框内容为''是则代表查找全部的用户
                                if (keyWord === '') {
                                    getAllUser(props.user.spreadCode).then(resp => {
                                        if (resp.data.state === 'success') {
                                            setList(resp.data.data.list)
                                        } else {
                                            message.error(`查询失败: ${resp.data.msg}`)
                                        }
                                    })
                                } else {
                                    // 当输入框有值时需要判断值是否是合法数字
                                    if (!keyWord) {
                                        message.warning('请输入用户编号')
                                    } else if(typeof +keyWord !== 'number') {
                                        message.error('请输入正确的用户编号')
                                    } else {
                                        searchUser({
                                            id: +keyWord,
                                            uid: props.user.spreadCode
                                        }).then(resp => {
                                            if (resp.data.state === 'success') {
                                                setList(resp.data.data)
                                            } else {
                                                message.error(`查询失败: ${resp.data.msg}`)
                                            }
                                        })
                                    }
                                }
                            }}
                        >搜索</Button>
                    </Col>
                </Card>
            </Row>
            {newList}
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component)
