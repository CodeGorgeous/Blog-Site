// 图片类型模型

const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class ImageTypes extends Model {}

ImageTypes.init({
    // 类型名
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 增加这一行数据的操作人
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 封面图
    coverImage: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ImageTypes',
    tableName: 'ImageTypes',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = ImageTypes;