import instance from '@/utils/axios'

interface Image {
    image: any[]
    type: number
    uid: string
}

/**
 * 新增图片
 * @param data 
 * @returns 
 */
export async function postImage(data: Image) {
    return await instance('/image', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

/**
 * 获取所有图片
 * @returns 
 */
export async function getAllImage() {
    return await instance('/image', {
        method: 'get'
    })
}

/**
 * 获得所有图片类型
 * @param uid 
 * @returns 
 */
export async function getImageType() {
    return await instance('/image/type', {
        method: 'get'
    })
}

interface ImageType {
    type: string
    uid: string
}

/**
 * 增加一种图片类型
 * @param data 
 * @returns 
 */
export async function postImageType(data: ImageType) {
    return await instance('/image/type', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

/**
 * 根据类型获取图片
 * @param type 
 * @returns 
 */
export async function searchImage(type: number) {
    return await instance('/image/search', {
        method: 'get',
        params: {
            type
        }
    })
}

interface DeleteImage {
    id: number
    uid: string
}

/**
 * 删除一张图片
 * @param params 
 * @returns 
 */
export async function deleteImage(params: DeleteImage) {
    return await instance('/image', {
        method: 'delete',
        params
    })
}