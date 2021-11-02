import React, { useState } from 'react'
import style from './css/alterUser.less'
import { Row, Col, Button, Input, Card, Modal, message, Select, Popover } from 'antd'
import { connect, history } from 'umi'
import { CloudUploadOutlined, CloudSyncOutlined, AlertOutlined } from '@ant-design/icons'
import { putUser } from '@/api/user'

interface Props {
    children?: any
    user?: any
    onSignOut?: any
}

const { confirm } = Modal;

const Component: React.FC = (props: Props) => {

    const [userName, setUserName] = useState(props.user.name)
    const [userPassword, setUserPassword] = useState('')
    const [level, setLevel] = useState(props.user.powerLevel)
    const [img, setImg] = useState(props.user.imgUrl)

    function modifyMessage(myMessage: any) {
        const newMessage = {
            name: myMessage.name || props.user.name,
            password: myMessage.password || props.user.password,
            powerLevel: myMessage.powerLevel || props.user.powerLevel,
            occupyImgUrl: myMessage.occupyImgUrl || props.user.imgUrl,
            id: props.user.id,
            uid: props.user.spreadCode
        }
        putUser(newMessage).then(resp => {
            if (resp.data.state === 'success') {
                message.success('修改成功, 请重新进行登录!')
                props.onSignOut && props.onSignOut()
            } else {
                message.error('修改失败:' + resp.data.msg)
            }
        })
    }

    function levelList() {
        const list = [{
            key: 1,
            level: '等级1'
        }, {
            key: 2,
            level: '等级2'
        }, {
            key: 3,
            level: '等级3'
        }, {
            key: 4,
            level: '等级4'
        }, {
            key: 5,
            level: '等级5'
        }, {
            key: 6,
            level: '等级6'
        }, {
            key: 7,
            level: '等级7'
        }, {
            key: 8,
            level: '等级8'
        }, {
            key: 9,
            level: '等级9'
        }, {
            key: 10,
            level: '等级10'
        }]
        return list.map(item => {
            return (
                <Select.Option value={item.key} key={item.key}>{item.level}</Select.Option>
            )
        })
    }

    return (
        <div className={style['put-container']}>
            <Col className={style['col']}>
                <Card title={(<h1>修改基本信息</h1>)} hoverable>
                    <Card className={style.card} hoverable>
                        <Button
                            icon={<CloudUploadOutlined />}
                            className={style.button}
                            type={"primary"}
                            onClick={() => {
                                if (!userName) return message.error('请输入用户名!')
                                modifyMessage({
                                    name: userName,
                                })
                            }}
                        >保存</Button>
                    </Card>
                    <Card
                        className={style.card}
                        hoverable
                        style={{
                            marginTop: '15px'
                        }}
                    >
                        <Row className={style.row}>
                            <Col className={style.span}>用户名: </Col>
                            <Col className={style.input}>
                                <Input
                                    value={userName}
                                    allowClear
                                    onChange={e => {
                                        setUserName(e.target.value)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Col>
            <Col className={style['col']}>
                <Card title={(<h1>更改密码</h1>)} hoverable>
                    <Card className={style.card} hoverable>
                        <Button
                            icon={<CloudUploadOutlined />}
                            className={style.button}
                            type={"primary"}
                            onClick={() => {
                                modifyMessage({
                                    password: userPassword
                                })
                            }}
                        >保存</Button>
                    </Card>
                    <Card
                        className={style.card}
                        hoverable
                        style={{
                            marginTop: '15px'
                        }}
                    >
                        <Row className={style.row}>
                            <Col className={style.span}>密码: </Col>
                            <Col className={style.input}>
                                <Input.Password
                                    allowClear
                                    value={userPassword}
                                    onChange={e => {
                                        setUserPassword(e.target.value)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Col>
            <Col className={style['col']}>
                <Card title={(<h1>修改权限</h1>)} hoverable>
                    <Card className={style.card} hoverable>
                        <Button
                            icon={<CloudUploadOutlined />}
                            className={style.button}
                            type={"primary"}
                            onClick={() => {
                                modifyMessage({
                                    powerLevel: level
                                })
                            }}
                        >保存</Button>
                    </Card>
                    <Card
                        className={style.card}
                        hoverable
                        style={{
                            marginTop: '15px'
                        }}
                    >
                        <Row className={style.row}>
                            <Col className={style.span}>权限: </Col>
                            <Col className={style.input}>
                                <Select
                                    defaultValue={level}
                                    onChange={(key) => {
                                        setLevel(key)
                                    }}>
                                    {levelList()}
                                </Select>
                            </Col>
                            <Col>
                                <Popover content={(
                                    <>
                                        <p>等级1: 只能进行查询操作, 无法修改博客等</p>
                                        <p>等级2: 未知</p>
                                        <p>等级3: 未知</p>
                                        <p>等级4: 未知</p>
                                        <p>等级5: 未知</p>
                                        <p>等级6: 未知</p>
                                        <p>等级7: 未知</p>
                                        <p>等级8: 未知</p>
                                        <p>等级9: 未知</p>
                                        <p>等级10: 最高级别权限</p>
                                    </>
                                )} title="权限等级说明" trigger="hover">
                                    <Button
                                        className={style['button']}
                                        icon={<AlertOutlined />}
                                        danger
                                        ghost
                                    ></Button>
                                </Popover>
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Col>
            <Col className={style['col']}>
                <Card title={(<h1>修改默认图</h1>)} hoverable>
                    <Card className={style.card} hoverable>
                        <Button
                            icon={<CloudUploadOutlined />}
                            className={style.button}
                            type={"primary"}
                            onClick={() => {
                                if (!img) return message.error('默认图不能为空')
                                modifyMessage({
                                    occupyImgUrl: img
                                })
                            }}
                        >保存</Button>
                    </Card>
                    <Card
                        className={style.card}
                        hoverable
                        style={{
                            marginTop: '15px'
                        }}
                    >
                        <Row className={style.row}>
                            <Col className={style.span}>默认图: </Col>
                            <Col className={style.input}>
                                <Input
                                    value={img}
                                    allowClear
                                    onChange={(e) => {
                                        setImg(e.target.value)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Col>
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, (dispatch: any) => {
    return {
        onSignOut() {
            dispatch({
                type: 'user/asyncSignOut'
            })
        }
    }
})(Component)
