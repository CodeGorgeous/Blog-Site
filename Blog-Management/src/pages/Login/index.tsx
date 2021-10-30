import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import style from './index.less'
import { UserOutlined, LockOutlined, ContainerOutlined } from '@ant-design/icons'
import { history } from 'umi'

const Component: React.FC = () => {

    const [state, setState] = useState('login')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [invitation, setInvitation] = useState('')

    useEffect(() => {
        setUserName('')
        setUserPassword('')
        setInvitation('')
    }, [state])

    return (
        <div className={style['login-container']}>
            <img
                className={style['login-image']}
                src="http://qiniu.codegorgeous.top/login.webp"
                alt=""
            />
            <div className={style['login-inputs']}>
                <h1>欢迎{state === 'login' ? '登录' : '注册'}</h1>
                <div className={style['login-box']}>
                    <Input
                        className={style['login-input']}
                        size="large"
                        placeholder="用户名"
                        prefix={<UserOutlined/>}
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <Input.Password
                        className={style['login-input']}
                        size="large"
                        placeholder="密码"
                        prefix={<LockOutlined />}
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                    />
                    <Input
                        className={style['login-input']}
                        size="large"
                        placeholder="邀请码"
                        prefix={<ContainerOutlined />}
                        style={{
                            display: state === 'register' ? 'inline-flex' : 'none'
                        }}
                        value={invitation}
                        onChange={e => setInvitation(e.target.value)}
                    />
                    <p
                        className={style['login-tips']}
                        style={{
                            display: state === 'login' ? 'block' : 'none'
                        }}
                    >
                        <span
                            onClick={() => {
                                setState('register')
                            }}
                        >
                            还没有账号? 点击这里进行注册
                        </span>
                    </p>
                    <p className={style['login-buttons']}>
                        <Button
                            style={{
                                display: state === 'login' ? 'inline-block' : 'none'
                            }}
                            className={style['login-button']}
                            size={"large"}
                            ghost
                            onClick={() => {
                                console.log('登录...开始验证账号')
                                history.push('/')
                            }}
                        >
                            登录
                        </Button>
                        <Button
                            style={{
                                display: state === 'register' ? 'inline-block' : 'none'
                            }}
                            className={style['login-button']}
                            size={"large"}
                            ghost
                            onClick={() => {
                                console.log('注册...开始验证账号')
                                setState('login')
                            }}
                        >
                            注册
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Component
