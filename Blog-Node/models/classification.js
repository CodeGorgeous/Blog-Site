const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize')

class Classification extends Model {}

Classification.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Classification',
    tableName: 'Classification',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = Classification