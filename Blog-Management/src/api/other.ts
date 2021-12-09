import instance from "@/utils/axios";

/**
 * 获取全部标语
 * @param uid 
 * @returns 
 */
export async function getAllTitle(uid: string) {
    return await instance('/other/title', {
        method: 'get',
        params: {
            uid
        }
    })
}

interface PostTitle {
    text: string
    uid: string
}

/**
 * 新增一条标语
 * @param data 
 * @returns 
 */
export async function postTitle(data: PostTitle) {
    return await instance('/other/title', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface DeleteTitle {
    id: number
    uid: string
}

/**
 * 删除一条标语
 * @returns 
 */
export async function deleteTitle(params: DeleteTitle) {
    return await instance('/other/title', {
        method: 'delete',
        params
    })
}
