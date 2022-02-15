import instance from '@/utils/axios'

/**
 * 获取所有七牛云文件
 * @returns 
 */
export async function getAllFile() {
    return await instance({
        url: 'http://codegorgeous.top:2551/obtain',
        method: 'GET'
    })
}

/**
 * 删除文件
 * @param id 
 * @returns 
 */
export async function deleteFile(id: number | string) {
    return await instance({
        method: 'DELETE',
        url: 'http://codegorgeous.top:2551/delete',
        params: {
            id
        }
    })
}