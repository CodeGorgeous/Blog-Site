const express = require('express');
const router = express.Router()
const userService = require('../../services/user')

// 登录路由
router.post('/', async(req, res) => {
    const result = await userService.login(req.body.userName, req.body.userPassword)
    res.send(result)
})

// 注册路由
router.post('/register', async(req, res) => {
    const result = await userService.register(req.body.userName, req.body.userPassword, req.body.invitationCode)
    res.send(result)
})

module.exports = router