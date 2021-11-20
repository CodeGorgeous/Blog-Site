import instance from '../utils/axios'

interface PageBlog {
    page: number,
    limit: number
}

/**
 * 分页获取博客
 * @param params 
 * @returns 
 */
export async function pageGetBlog(params: PageBlog) {
    return await instance('/blog/page', {
        method: 'get',
        params
    })
}

/**
 * 获取所有博客分类
 * @returns 
 */
export async function getAllBlogType() {
    return await instance('/blog/type', {
        method: 'get'
    })
}

/**
 * 根据博客类型获取博客
 * @param typeId 
 * @returns 
 */
export async function searchTypeBlog(typeId: number) {
    return await instance('/blog/searchType', {
        method: 'get',
        params: {
            typeId
        }
    })
}
