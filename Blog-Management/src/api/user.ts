import instance from '@/utils/axios'

interface User {
    userName: string,
    userPassword: string
}

/**
 * 用户登录
 * @param data
 * @returns 
 */
export async function userSignIn(data: User) {
    return await instance('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface UserR {
    userName: string
    userPassword: string
    invitationCode: string
}

/**
 * 用户注册
 * @param data 
 * @returns 
 */
export async function userRegister(data: UserR) {
    return await instance('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}
