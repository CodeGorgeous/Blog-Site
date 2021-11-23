import instance from '../utils/axios'

/**
 * 随机获得一个标语
 * @returns 
 */
export async function getTitle() {
    return instance({
        url: '/other/title/random',
        method: 'get'
    })
}
