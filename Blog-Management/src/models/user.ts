import { userSignIn, userRegister } from '@/api/user'
import { message } from 'antd'
import { history } from 'umi'

interface User {
    id: string
    name: string
    password: string
    spreadCode: string
    powerLevel: number
    imgUrl: string
}

interface UserLogin {
    userName: string
    userPassword: string
}

export default {
    state: {
        id: 0,
        name: '',
        password: '',
        spreadCode: '',
        powerLevel: 0,
        imgUrl: '',
        isLogin: false
    },
    reducers: {
        signIn(state: object, action: {
            type: string,
            payload: User
        }) {
            return {
                ...action.payload,
                isLogin: true
            }
        },
        signOut(state: object, action: {
            type: string
            payload: any
        }) {
            return {
                id: 0,
                name: '',
                password: '',
                spreadCode: '',
                powerLevel: 0,
                isLogin: false
            }
        }
    },
    effects: {
        *asyncSignIn(action: {
            type: string,
            payload: UserLogin
        }, effect: any): Generator<any,any,any> {
            let result
            result = yield effect.call(userSignIn, action.payload)
            if (result.state === 'success') {
                yield effect.put({
                    type: 'signIn',
                    payload: {
                        id: result.data.id,
                        name: result.data.name,
                        password: result.data.password,
                        spreadCode: result.data.spreadCode,
                        powerLevel: result.data.powerLevel,
                        imgUrl: result.data.occupyImgUrl
                    }
                })
                yield effect.call(history.push, '/')
                yield effect.call(message.success, result.msg)
            } else {
                yield effect.call(message.error, result.msg)
            }
        },
        *asyncSignOut(action: {
            type: string
        }, effect: any): Generator<any,any,any> {
            yield effect.put({type: 'signOut'})
            yield effect.call(history.push, '/login')
            yield effect.call(message.success, '登出成功')
        }
    }
}