const Image = require('../models/image')
const ImageTypes = require('../models/imageTypes')
const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')

module.exports = {
    // 创建图片类型
    async createType(type, uid) {
        try {
            // 查询是否已有该种类型
            let result = await ImageTypes.findOne({
                where: {
                    type
                }
            });
            if (result) return createResp('fail', '该类型已存在', {});
            // 查看该uid是否合法
            result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await ImageTypes.create({
                type,
                uid
            });
            // 查询是否创建成功
            if (!result) return createResp('fail', '创建失败', {})
            return createResp('success', '创建成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有图片类型
    async getAllTypes(uid) {
        try {
            // 查看该uid是否合法
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
                // 获取所有类型
            result = await ImageTypes.findAll()
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 增加一张图片
    async createImage(name, imgUrl, typeId, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Image.create({
                name,
                imgUrl,
                'type_id': typeId
            })
            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有图片
    async getAllImage(uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Image.findAndCountAll()
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 联表查询图片
    async searchImage(type, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Image.findAll({
                include: [{
                    model: ImageTypes,
                    where: {
                        id: type
                    }
                }]
            })
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}