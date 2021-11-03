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
            let result;
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
    },
    // 获取所有用户
    async getAllUser(uid) {
        const result = await User.findOne({
            where: {
                spreadCode: uid
            }
        });
        // 未找到用户
        if (result) {
            const dataList = await User.findAndCountAll()

            // 权限等级小于5不显示每个用户的专属邀请码, 和被谁邀请的
            if (result.dataValues.powerLevel <= 5) { // 不显示
                const newList = dataList.rows.map(item => {
                    delete item.dataValues.spreadCode;
                    delete item.dataValues.code;
                    return item.dataValues
                })
                return createResp('success', '查询成功', {
                    total: dataList.count,
                    list: newList
                })
            } else {
                return createResp('success', '查询成功', {
                    total: dataList.count,
                    list: dataList.rows
                })
            }
        } else {
            return createResp('fail', '该操作人不存在', {})
        }

    },
    // 修改用户信息
    async putUser(name, password, powerLevel, occupyImgUrl, id, uid) {
        try {
            // 看操作人是否存在
            const result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (result) {
                const result = await User.findOne({
                    where: {
                        id
                    }
                });
                // 想要找的用户是否存在
                if (result) {
                    const newResult = await User.update({
                        name,
                        password,
                        powerLevel,
                        occupyImgUrl
                    }, {
                        where: {
                            id
                        }
                    })
                    if (newResult) {
                        return createResp('success', '修改成功', {})
                    } else {
                        return createResp('fail', '修改失败', {})
                    }
                } else {
                    return createResp('fail', '该用户不存在', {})
                }
            } else {
                return createResp('fail', '该操作人不存在', {})
            }
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 根据id搜索用户
    async searchUser(id, uid) {
        try {
            // 看操作人是否存在
            const result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (result) {
                const result = await User.findOne({
                    where: {
                        id
                    }
                })
                if (result) {
                    return createResp('success', '查询成功', [result])
                } else {
                    return createResp('fail', '未查询到该用户', {})
                }
            } else {
                return createResp('fail', '该操作人不存在')
            }
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}