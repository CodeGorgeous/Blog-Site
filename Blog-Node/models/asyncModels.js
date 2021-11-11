// 建立表关联
const ImageTypes = require('./imageTypes')
const Image = require('./image')
const ResourcesType = require('./resourcesType')
const Resources = require('./resources')
const Classification = require('./classification')

// 一张照片能归属到一种图片类型中
Image.belongsTo(ImageTypes, {
    foreignKey: 'type_id',
    sourceKey: 'id'
})

// 一种图片类型能有多张图片
ImageTypes.hasMany(Image, {
    foreignKey: 'type_id',
    sourceKey: 'id'
})

// 一个资源只能归属到一个资源类型中
Resources.belongsTo(ResourcesType, {
    foreignKey: 'resources_id',
    sourceKey: 'id'
})

// 一个资源类型可以拥有多个资源
ResourcesType.hasMany(Resources, {
    foreignKey: 'resources_id',
    sourceKey: 'id'
})

// 一个资源大分类可以拥有多个资源类型
Classification.hasMany(ResourcesType, {
    foreignKey: 'type_id',
    sourceKey: 'id'
});
// 一个资源类型只能归属到一个资源大分类中
ResourcesType.belongsTo(Classification, {
    foreignKey: 'type_id',
    sourceKey: 'id'
})


console.log('表关联建立成功!')