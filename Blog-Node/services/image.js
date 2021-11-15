const Image = require('../models/image')
const ImageTypes = require('../models/imageTypes')
const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')
const { token, url } = require('../utils/qiniu')
const { v4 } = require('uuid')
const { resolve } = require('path')
const fs = require('fs')

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
    async createImage(name, imgBase64, typeId, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {});
            // 把拿到的文件转储为一张图片
            const imageName = v4().slice(0, 6);
            // 得到图片类型
            let imageType;
            if (imgBase64.match(/^data:image\/\w+;base64,/)) { // 判断传递的是否为图片base64
                let data = imgBase64.match(/^data:image\/\w+;base64,/)[0]
                data = data.replace(/data:image\//, "")
                imageType = data.replace(/;base64,/, "")
            } else {
                return createResp('fail', '数据不符合规范', {})
            }
            // 拿到文件名
            const fileName = `${imageName}.${imageType}`
                // 得到消除过头部数据的图片base64编码
            const base64 = imgBase64.replace(/^data:image\/\w+;base64,/, "");
            // base64转为Buffer进行存储
            const imageBuffer = new Buffer(base64, 'base64')
            fs.writeFileSync(resolve(__dirname, '..', 'resources', 'image', fileName), imageBuffer);
            // 七牛云文件直传
            const config = new qiniu.conf.Config();
            // 设置存储空间所在的地区
            config.zone = qiniu.zone.Zone_z2;
            // 设置路径为转出的图片路径
            const file = resolve(__dirname, '..', 'resources', 'image', fileName)
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(token, fileName, file, putExtra, function(respErr, respBody, respInfo) {
                if (respErr) {
                    return createResp('fail', '上传错误', respErr)
                }
                if (respInfo.statusCode == 200) {
                    // 成功后拿到路径
                    const imageUrl = url + fileName;
                    // 将路径放到数据库中
                    result = await Image.create({
                        name,
                        imgUrl: imageUrl,
                        'type_id': typeId
                    })
                    if (!result) return createResp('fail', '新增失败', {})
                    return createResp('success', '新增成功', {})
                } else {
                    return createResp('fail', '上传失败', respInfo.statusCode)
                }
            })

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