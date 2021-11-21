import instance from '../utils/axios'

/**
 * 获取所有图片类型
 * @returns 
 */
export async function getImageType() {
    return await instance({
        url: '/image/type',
        method: 'get'
    })
}

/**
 * 根据类型获取相应的图片数据
 * @param id 
 * @returns 
 */
export async function searchTypeImage(id:number) {
    return await instance({
        url: '/image/search',
        method: 'get',
        params: {
            type: id
        }
    })
}

