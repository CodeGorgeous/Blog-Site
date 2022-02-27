import instance from "@/utils/axios";


export async function getServeMessage(uid: string) {
    return await instance({
        url: '/other/server',
        method: 'get',
        params: {
            uid
        }
    })
}