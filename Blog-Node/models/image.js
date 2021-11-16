// 图片存储模型

const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class Image extends Model {}

Image.init({
    // 图片名
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qiniuName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 图片url
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Image',
    tableName: 'Image',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = Image;