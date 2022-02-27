const express = require('express');
const router = express.Router()
const otherService = require('../../services/other')

// 获取所有标语
router.get('/title', async(req, res) => {
    const result = await otherService.getAllTitle(req.query.uid)
    res.send(result)
})

// 新增标语
router.post('/title', async(req, res) => {
    const result = await otherService.createTitle(req.body.text, req.body.uid)
    res.send(result)
})

// 删除标语
router.delete('/title', async(req, res) => {
    const result = await otherService.deleteTitle(req.query.id, req.query.uid)
    res.send(result)
})

// 随机获取一条标语
router.get('/title/random', async(req, res) => {
    const result = await otherService.randomGetTitle()
    res.send(result)
})

// 服务器相关信息
router.get('/server', async(req, res) => {
    const result = await otherService.getServer(req.query.uid);
    res.send(result);
})

module.exports = router