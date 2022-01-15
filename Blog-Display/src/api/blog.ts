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

/**
 * 根据博客id查询博客内容
 * @param id 
 * @returns 
 */
export async function searchIdBlog(id: number) {
    return await instance('/blog/searchId', {
        method: 'get',
        params: {
            id
        }
    })
}

/**
 * 获取所有博客
 * @returns 
 */
export async function getAllBlogs() {
    return await instance('/blog', {
        method: 'GET'
    })
}