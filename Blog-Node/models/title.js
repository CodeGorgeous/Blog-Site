const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class Title extends Model {}

Title.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Title',
    tableName: 'Title',
    createdAt: true,
    updatedAt: false,
    paranoid: false
})

module.exports = Title;