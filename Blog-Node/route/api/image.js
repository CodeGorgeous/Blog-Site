const express = require('express');
const router = express.Router()
const imageService = require('../../services/image')

// 获取所有类型
router.get('/type', async(req, res) => {
    const result = await imageService.getAllTypes()
    res.send(result)
})

// 增加类型
router.post('/type', async(req, res) => {
    console.log(req.body)
    const result = await imageService.createType(req.body.type, req.body.image, req.body.uid)
    res.send(result)
})

// 增加图片
router.post('/', async(req, res) => {
    const result = await imageService.createImage(req.body.image, req.body.type, req.body.uid)
    res.send(result)
})

// 获取所有图片
router.get('/', async(req, res) => {
    const result = await imageService.getAllImage()
    res.send(result)
})

// 按照图片类型获取图片
router.get('/search', async(req, res) => {
    const result = await imageService.searchImage(req.query.type)
    res.send(result)
})

// 删除图片
router.delete('/', async(req, res) => {
    const result = await imageService.deleteImage(req.query.id, req.query.uid)
    res.send(result)
})

module.exports = router