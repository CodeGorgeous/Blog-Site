const sequelize = require('./index');
const { DataTypes, Model } = require('sequelize');

class ResourcesType extends Model {}

ResourcesType.init({
    // 资源名称
    resourcesName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ResourcesType',
    tableName: 'ResourcesType',
    createdAt: true,
    updatedAt: true,
    paranoid: false
})

module.exports = ResourcesType;