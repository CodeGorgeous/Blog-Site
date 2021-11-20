// 博客文章模型
const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class BlogType extends Model {}

BlogType.init({
    typeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'BlogType',
    tableName: 'BlogType',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = BlogType;