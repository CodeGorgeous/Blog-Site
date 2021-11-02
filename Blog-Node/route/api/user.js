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

// 获取所有用户
router.get('/', async(req, res) => {
    const result = await userService.getAllUser(req.query.uid)
    res.send(result)
})

// 修改用户信息
router.put('/', async(req, res) => {
    const body = req.body
    const result = await userService.putUser(body.name, body.password, body.powerLevel, body.occupyImgUrl, body.id, body.uid)
    res.send(result)
})

// 根据邀请码查询用户
router.get('/search', async(req, res) => {
    const result = await userService.searchUser(req.query.id, req.query.uid)
    res.send(result)
})

module.exports = router