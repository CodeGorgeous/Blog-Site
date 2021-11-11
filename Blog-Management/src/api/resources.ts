import instance from "@/utils/axios";

// 获取全部资源
export async function getAllResources(uid: string) {
    return await instance('/resources/mes', {
        method: 'get',
        params: {
            uid
        }
    })
}

// 获取所有分类及其子类型
export async function getAllResourcesType() {
    return await instance('/resources', {
        method: 'get'
    })
}

// 获取子类型对应的资源
export async function getResources(id: number) {
    return await instance('/resources/type', {
        method: 'get',
        params: {
            id
        }
    })
}

interface Classification {
    type: string
    uid: string
}

// 增加大分类
export async function postClassification(data: Classification) {
    return await instance('/resources', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface ResourcesType {
    name: string
    uid: string
}

// 增加小分类
export async function postResourcesType(data: ResourcesType) {
    return await instance('/resources', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface Resources {
    name: string
    url: string
    image: string
    introduce: string
    tags: string
    id: number
    uid: string
}

// 增加资源
export async function postResources(data: Resources) {
    return await instance('/resources', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
