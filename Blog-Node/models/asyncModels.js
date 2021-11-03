// 建立表关联
const ImageTypes = require('./imageTypes')
const Image = require('./image')

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

console.log('表关联建立成功!')