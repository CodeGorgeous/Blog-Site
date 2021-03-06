import instance from "@/utils/axios";


/**
 * 获取博客
 * @returns 
 */
export async function getAllBlogs() {
    return await instance('/blog', {
        method: 'GET'
    })
}

interface Blog {
    name: string
    timer: string
    url: string
    author: string
    codeUrl: string
    tags: string
    text: string
    uid: string
    introduce: string
    typeId: number
}

/**
 * 新增博客
 * @param data 
 * @returns 
 */
export async function postBlog(data: Blog) {
    return await instance('/blog', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

interface BlogModify {
    id: number
    uid: string
    text: string
    typeId: number
}


/**
 * 修改博客
 * @param data 
 * @returns 
 */
export async function putBlog(data: BlogModify) {
    return await instance('/blog', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}

interface BlogDelete {
    id: number
    uid: string
}

/**
 * 删除一篇博客
 * @param data 
 * @returns 
 */
export async function deleteBlog(params: BlogDelete) {
    return await instance('/blog', {
        method: "DELETE",
        params
    })
}

/**
 * 查询一篇博客
 * @param id 
 * @returns 
 */
export async function getBlog(id: number) {
    return await instance('/blog/searchId', {
        method: "GET",
        params: {
            id
        }
    })
}

/**
 * 获取所有博客分类
 * @returns 
 */
export async function getBlogType() {
    return await instance('/blog/type', {
        method: "GET",
    })
}

interface BlogType {
    typeName: string
    uid: string
}

/**
 * 新增博客分类
 * @returns 
 */
export async function postBlogType(data: BlogType) {
    return await instance('/blog/type', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface PutBlogType {
    typeId: number
    name: string
    uid: string
}

/**
 * 修改博客分类名称
 * @param data 
 * @returns 
 */
export async function putBlogType(data: PutBlogType) {
    return await instance('/blog/type', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface DeleteBlogType {
    id: number
    uid: string
}

/**
 * 删除一个博客分类
 * @param params 
 * @returns 
 */
export async function deleteBlogType(params: DeleteBlogType) {
    return await instance('/blog/type', {
        method: 'DELETE',
        params
    })
}

