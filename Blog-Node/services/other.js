const Title = require('../models/title')
const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')
const system = require('../utils/serverMessage.js');

module.exports = {
    // 新增标语
    async createTitle(text, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Title.create({
                title: text
            })
            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有标语
    async getAllTitle(uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Title.findAndCountAll()
            if (!result) return createResp('fail', '获取失败', {})
            return createResp('success', '获取成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 删除一条标语
    async deleteTitle(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Title.destroy({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '删除失败', {})
            return createResp('success', '删除成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 随机获取一条标语
    async randomGetTitle() {
        try {
            let result = await Title.findAll()
            if (!result) return createResp('fail', '获取失败', {})
            const random = Math.floor(Math.random() * result.length)
            return createResp('success', '获取成功', result[random])
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取服务器相关信息
    async getServer(uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            let r = {}
            for (const key in system) {
                r[key] = system[key]();
            }
            if (!result) return createResp('fail', '该操作人不存在', {});
            return createResp('success', '', r)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}