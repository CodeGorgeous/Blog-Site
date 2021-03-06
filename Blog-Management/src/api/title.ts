import instance from "@/utils/axios";

/**
 * 获取全部标语
 * @param uid
 * @returns
 */
export async function getAllTitle(uid: string) {
    return await instance({
        url: '/other/title',
        method: 'get',
        params: {
            uid
        }
    })
}

interface CreateTitle {
    text: string
    uid: string
}

/**
 * 向数据库中增添一条标语
 * @param data
 * @returns
 */
export async function postTitle(data: CreateTitle) {
    return await instance({
        url: '/other/title',
        method: 'post',
        data
    })
}

interface DeleteTitle {
    id: number
    uid: string
}

/**
 * 删除一条标语
 * @param params
 * @returns
 */
export async function deleteTitle(params: DeleteTitle) {
    return await instance({
        url: '/other/title',
        method: 'delete',
        params
    })
}

/**
 * 随机拿一个标语
 * @returns
 */
export async function gerRandomTitle() {
    return await instance({
        url: '/other/title/random',
        method: 'get'
    })
}
