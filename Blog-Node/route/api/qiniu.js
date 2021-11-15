const express = require('express');
const router = express.Router()
const qiniuService = require('../../services/qiniu')

// 获取七牛云token
router.get('/token', async(req, res) => {
    const result = await qiniuService.getToken(req.query.uid)
    res.send(result)
})

module.exports = router