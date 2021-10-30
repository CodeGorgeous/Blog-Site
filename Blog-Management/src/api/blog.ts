import instance from "@/utils/axios";


/**
 * 获取博客
 * 此处鉴权由前端进行
 * @returns 
 */
export async function getAllBlogs() {
    return await instance.get('/blog')
}

interface Blog {
    name: string,
    timer: string,
    url: string,
    author: string,
    codeUrl: string,
    tags: string[],
    text: string
}

/**
 * 新增博客
 * @param data 
 * @returns 
 */
export async function postBlog(data: Blog) {
    return await instance.post('/blog', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

/**
 * 修改博客
 * @param data 
 * @returns 
 */
export async function putBlog(data: Blog) {
    return await instance.put('/blog', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}

/**
 * 删除一篇博客
 * @param data 
 * @returns 
 */
export async function deleteBlog(data: number) {
    return await instance.delete('/blog', {
        data: data
    })
}
