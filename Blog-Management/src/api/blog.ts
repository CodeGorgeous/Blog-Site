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
    name: string,
    timer: string,
    url: string,
    author: string,
    codeUrl: string,
    tags: string,
    text: string,
    uid: string
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
    return await instance('/blog/search', {
        method: "GET",
        params: {
            id
        }
    })
}
