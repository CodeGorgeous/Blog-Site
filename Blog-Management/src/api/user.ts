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

/**
 * 获取所有用户
 * @param uid 
 * @returns 
 */
export async function getAllUser(uid: string) {
    return await instance('/user', {
        method: 'GET',
        params: {
            uid
        }
    })
}

interface putUser {
    name: string
    password: string
    powerLevel: number
    occupyImgUrl: string
    id: number
    uid: string
}
/**
 * 修改用户信息
 * @param data 
 * @returns 
 */
export async function putUser(data: putUser) {
    return await instance('/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

interface searchUser {
    id: number
    uid: string
}
/**
 * 搜索用户
 * @param params 
 * @returns 
 */
export async function searchUser(params: searchUser) {
    return await instance('/user/search', {
        method: 'GET',
        params
    })
}
