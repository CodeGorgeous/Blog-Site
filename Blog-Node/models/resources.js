const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class Resources extends Model {}

Resources.init({
    // 资源名称
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 资源跳转地址
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 资源示意图
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    introduce: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 资源标签
    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Resources',
    tableName: 'Resources',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = Resources