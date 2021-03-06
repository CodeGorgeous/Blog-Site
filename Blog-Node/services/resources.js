const ResourcesType = require('../models/resourcesType');
const Resources = require('../models/resources');
const Classification = require('../models/classification');
const User = require('../models/user');
const { createResp } = require('../utils/createResp.js')

module.exports = {
    // 获取所有的大分类类型及其子类型
    async getAllResourcesType() {
        try {
            const result = await Classification.findAll({
                include: [{
                    model: ResourcesType
                }]
            })
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 增加大分类
    async createClassification(type, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            if (!type) return createResp('fail', '缺少分类名称', {})
            result = await Classification.create({
                type
            })
            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 增加子类型
    async createResourcesType(resourcesName, typeId, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            if (!resourcesName) return createResp('fail', '缺少分类名称', {})
            result = await ResourcesType.create({
                resourcesName,
                'type_id': typeId
            })
            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 增加资源
    async createResources(name, url, image, introduce, tags, resources_id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            if (!name || !url || !image || !introduce || !tags || !resources_id) return createResp('fail', '缺少数据', {})
            result = await Resources.create({
                name,
                url,
                image,
                introduce,
                tags,
                resources_id
            })
            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 根据子类型id查询资源
    async getResources(id) {
        try {
            if (!id) return createResp('fail', '缺少分类id', {})
            const result = await Resources.findAll({
                where: {
                    resources_id: id
                }
            })
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有资源
    async getAllResources(uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Resources.findAll()
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 根据资源id查询资源
    async getSearchResources(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Resources.findOne({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '未找到该资源', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 修改资源信息
    async putResource(id, name, url, image, introduce, tags, resources_id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
                // 修改数据库操作
            result = Resources.update({
                name,
                url,
                image,
                introduce,
                tags,
                resources_id
            }, {
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '修改失败', {})
            return createResp('success', '修改成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 删除某个资源
    async deleteResource(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})

            // 看这个资源数据是否存在
            result = await Resources.findOne({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '该资源不存在', {})

            result = await Resources.destroy({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '删除失败', {})
            return createResp('success', '删除成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}