const Image = require('../models/image')
const ImageTypes = require('../models/imageTypes')
const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')
const { token, url, fileUpload, deleteFile } = require('../utils/qiniu')
const { v4 } = require('uuid')
const { resolve } = require('path')
const fs = require('fs')

module.exports = {
    // 创建图片类型
    async createType(type, image, uid) {
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
                uid,
                coverImage: image
            });
            // 查询是否创建成功
            if (!result) return createResp('fail', '创建失败', {})
            return createResp('success', '创建成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有图片类型
    async getAllTypes() {
        try {
            // 获取所有类型
            result = await ImageTypes.findAll({
                attributes: ['id', 'type', 'coverImage']
            })
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 增加一张图片
    async createImage(data, typeId, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {});
            // 用于记录上传图片时发生的错误
            let uploadedMessage = []
            return Promise.all(data.map((item) => {
                return new Promise(async(resolves, reject) => {
                    // 拿到存储在七牛云上的文件名称
                    const fileName = getFileName(item.imageBase64);
                    // 文件暂时转储到/resources/image文件夹下
                    await imageStorage(fileName, item.imageBase64);
                    // 文件路径
                    const filePath = resolve(__dirname, '..', 'resources', 'image', fileName);
                    // 上传至七牛云
                    fileUpload(fileName, filePath, async(error, body, info) => {
                        if (error) {
                            reject();
                        }
                        if (info.statusCode == 200) {
                            // 表示上传成功
                            const imgUrl = url + fileName
                            const result = await Image.create({
                                name: item.name,
                                qiniuName: fileName,
                                imgUrl,
                                type_id: typeId
                            })
                            if (!result) reject();
                            resolves();
                        } else {
                            reject();
                        }
                    });
                })
            })).then(resp => {
                // 把暂时转储的文件删除, 避免文件积累
                fs.unlinkSync(filePath)
                return createResp('success', '新增成功', {})
            }).catch(err => {
                if (uploadedMessage.length !== 0) return createResp('fail', '新增失败', uploadedMessage)
            })
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 获取所有图片
    async getAllImage() {
        try {
            let result = await Image.findAndCountAll()
            if (!result) return createResp('fail', '查询失败', {})
            return createResp('success', '查询成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 联表查询图片
    async searchImage(type) {
        try {
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
    },
    // 删除一张图片
    async deleteImage(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {});
            // 找到数据库中对应的数据条目
            result = await Image.findOne({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '未找到该资源', {})
            const data = result.dataValues;
            let error = null
            await deleteFile(data.qiniuName, async(err, body, info) => {
                if (err) {
                    error = err
                } else {
                    if (info.statusCode === 200) {
                        // 删除数据库中的数据
                        result = await Image.destroy({
                            where: {
                                id
                            }
                        });
                    } else {
                        error = info
                    }
                }
            });
            if (error) return createResp('fail', '七牛云文件删除失败', error);
            return createResp('success', '删除成功', {});
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 修改类型
    async putImageType(id, name, image, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {});
            // 更新数据
            result = await ImageTypes.update({
                type: name,
                coverImage: image,
                uid
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
    // 删除类型
    async deleteImageType(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            })
            if (!result) return createResp('fail', '该操作人不存在', {})
            result = await Image.findAll({
                where: {
                    type_id: id
                }
            })
            if (result.length > 0) return createResp('fail', '该分类下存在有图片, 请转移后重新尝试!', {})
            result = await ImageTypes.destroy({
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

/**
 * 根据文件base64编码生成一个随机文件名
 * @param {*} base64 
 * @returns 
 */
function getFileName(base64) {
    const imageName = v4().slice(0, 6);
    let imageSuffix = '';
    if (base64.match(/^data:image\/\w+;base64,/)) {
        let data = base64.match(/^data:image\/\w+;base64,/)[0]
        data = data.replace(/data:image\//, "")
        imageSuffix = data.replace(/;base64,/, "")
        return `${imageName}.${imageSuffix}`
    } else { // 不符合图片规范返回undefined
        return
    }
}

// 图片存储
function imageStorage(name, data) {
    // 拿到文件的base64编码
    const base64 = data.replace(/^data:image\/\w+;base64,/, "");
    // base64转码为Buffer
    const buffer = new Buffer.from(base64, 'base64');
    // 暂时存储图片
    fs.writeFileSync(resolve(__dirname, '..', 'resources', 'image', name), buffer);
}