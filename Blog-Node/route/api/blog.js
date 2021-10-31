const express = require('express');
const router = express.Router()
const blogService = require('../../services/blog')

// 获取所有博客
router.get('/', async(req, res) => {
    const result = await blogService.getAllBlogs()
    res.send(result)
})

// 新增一篇博客
router.post('/', async(req, res) => {
    const body = req.body
    const result = await blogService.postBlogs(body.name, body.timer, body.url, body.author, body.codeUrl, body.tags, body.text)
    res.send(result)
})

// 修改一篇博客
router.put('/', async(req, res) => {
    const body = req.body
    const result = await blogService.putBlog(body.name, body.timer, body.url, body.author, body.codeUrl, body.tags, body.text, body.id)
    res.send(result)
})

// 删除一篇博客
router.delete('/', async(req, res) => {
    const result = await blogService.deleteBlog(req.body.id)
    res.send(result)
})

module.exports = router