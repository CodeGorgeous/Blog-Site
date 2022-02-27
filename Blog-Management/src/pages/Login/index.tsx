import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import style from './index.less'
import { UserOutlined, LockOutlined, ContainerOutlined } from '@ant-design/icons'
import { connect } from 'umi'
import { userRegister } from '@/api/user'
import Cookies from 'js-cookie'
import { ICookieUserData } from '../../types/interfaces'

interface IProps {
    onSignIn?: (payload: User) => void
}

const Component: React.FC<IProps> = (props) => {

    const [state, setState] = useState('login')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [invitation, setInvitation] = useState('')

    function userLogin() {
        // 校验
        if (!userName) {
            return message.error('请填写您的用户名!')
        }
        if (!userPassword) {
            return message.error('请填写您的密码!')
        }
        props.onSignIn && props.onSignIn({
            userName,
            userPassword
        })
    }

    useEffect(() => {
      //TODO: 用户登录时查看一下cookie内是否存储有账户, 如果有则自动进行登入
      const result: any = Cookies.get('user');
      const user: ICookieUserData | undefined = result ? JSON.parse(result) : result;
      if (user) {
        props.onSignIn && props.onSignIn({
          userName: user.userName,
          userPassword: user.userPassword
        })
      }
    }, [])

    useEffect(() => {
        setUserName('')
        setUserPassword('')
        setInvitation('')
        return () => {
            // 组件销毁时调用自动该函数

        }
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
                        allowClear
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
                    >
                        <span
                            onClick={() => {
                                if (state === 'register') return setState('login')
                                if (state === 'login') return setState('register')
                            }}
                        >
                            { state === 'login' ? '还没有账号? 点击这里进行注册' : '已经有账号? 点击这里进行登录' }

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
                                userLogin()
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
                                userRegister({
                                    userName,
                                    userPassword,
                                    invitationCode: invitation
                                }).then((resp: any) => {
                                    if (resp.state === 'success') {
                                        message.success('注册成功')
                                        setState('login')
                                    } else {
                                        message.error(`注册失败, 失败原因: ${resp.data.msg}`)
                                    }
                                })
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

interface User {
    userName: string
    userPassword: string
}

export default connect((state: any) => {
    return {}
}, (dispatch: any) => {
    return {
        onSignIn(payload: User) {
            dispatch({
                type: 'user/asyncSignIn',
                payload: payload
            })
        }
    }
})(Component)
