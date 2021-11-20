// 博客文章模型
const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class Blog extends Model {}

Blog.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    introduce: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createTimer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupyImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    githubUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
    markdownName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    htmlName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Blog',
    tableName: 'Blog',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})
module.exports = Blog;