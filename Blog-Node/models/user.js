// 用户模型

const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class User extends Model {}

User.init({
    // 用户名
    name: {
        // string
        type: DataTypes.STRING,
        // 不允许空
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 邀请码
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 邀请别人的码
    spreadCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 权限等级
    powerLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // 占位图
    occupyImgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = User;