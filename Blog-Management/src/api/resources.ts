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
    id: number
    uid: string
}

// 增加小分类
export async function postResourcesType(data: ResourcesType) {
    return await instance('/resources/type', {
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
    return await instance('/resources/mes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface Search {
    id: number
    uid: string
}

// 根据id查询资源
export async function getSearchResource(params: Search) {
    return await instance('/resources/search', {
        method: 'get',
        params
    })
}

interface updateResource {
    id: number
    name: string
    url: string
    image: string
    introduce: string
    tags: string
    typeId: number
    uid: string
}

/**
 * 修改资源
 * @param data 
 * @returns 
 */
export async function putResource(data: updateResource) {
    return await instance('/resources/mes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

interface deleteResource {
    id: number
    uid: string
}

export async function deleteResource(params: deleteResource) {
    return await instance('/resources/mes', {
        method: 'delete',
        params
    })
}
