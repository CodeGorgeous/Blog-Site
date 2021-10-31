const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')
const { v4 } = require('uuid')

module.exports = {
    // 用户登录
    async login(name, password) {
        const result = await User.findOne({
            where: {
                name,
                password
            }
        })
        if (result) {
            return createResp('success', '登录成功', result)
        } else {
            return createResp('fail', '账号/密码错误', {})
        }
    },
    // 注册账号
    async register(name, password, code) {
        // 数据是否为空
        if (!name || !password || !code) {
            return createResp('fail', '用户名/密码/邀请码不能为空', {})
        } else {
            let result
                // 万能邀请码
            if (code === '167519') {
                result = await User.findOne({
                    where: {
                        name
                    }
                });
            } else {
                const newResult = await User.findOne({
                        where: {
                            spreadCode: code
                        }
                    })
                    // 查询邀请码是否有效
                if (!newResult) {
                    return createResp('fail', '邀请码无效', {})
                }
            }
            // 该用户已经存在
            if (result) {
                return createResp('fail', '用户已存在', {})
            } else {
                const result = User.create({
                    name,
                    password,
                    powerLevel: code === '167519' ? 10 : 1,
                    code,
                    // 自动生成一个唯一邀请码
                    spreadCode: v4().slice(0, 6),
                    occupyImgUrl: 'http://qiniu.codegorgeous.top/loading.gif'
                })
                console.log('执行', result)
                return createResp('success', '注册成功', result)
            }
        }
    }
}