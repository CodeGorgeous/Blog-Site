const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')


module.exports = {
    // 七牛云token
    async getToken(uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            return createResp('success', '获取token成功', )
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}