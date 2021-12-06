const express = require('express');
const router = express.Router()
const blogService = require('../../services/blog')

// 获取所有博客类型
router.get('/type', async(req, res) => {
    const result = await blogService.getAllBlogTypes()
    res.send(result)
})

// 新增博客类型
router.post('/type', async(req, res) => {
    const result = await blogService.postBlogType(req.body.typeName, req.body.uid)
    res.send(result)
})

// 修改博客类型
router.put('/type', async(req, res) => {
    const result = await blogService.putBlogType(req.body.typeId, req.body.name, req.body.uid)
    res.send(result)
})

// 删除博客类型
router.delete('/type', async(req, res) => {
    const result = await blogService.deleteBlogType(req.query.id, req.query.uid)
    res.send(result)
})

// 获取所有博客
router.get('/', async(req, res) => {
    const result = await blogService.getAllBlogs()
    res.send(result)
})

// 新增一篇博客
router.post('/', async(req, res) => {
    const body = req.body
    const result = await blogService.postBlogs(body.name, body.introduce, body.timer, body.url, body.author, body.codeUrl, body.tags, body.text, body.typeId, body.uid)
    res.send(result)
})

// 修改一篇博客
router.put('/', async(req, res) => {
    const body = req.body
    const result = await blogService.putBlog(body.text, body.id, body.typeId, body.uid)
    res.send(result)
})

// 删除一篇博客
router.delete('/', async(req, res) => {
    const result = await blogService.deleteBlog(req.query.id, req.query.uid)
    res.send(result)
})

// 根据博客id查询博客
router.get('/searchId', async(req, res) => {
    const result = await blogService.searchBlog(req.query.id)
    res.send(result)
})

// 分页查询
router.get('/page', async(req, res) => {
    const result = await blogService.pageGetBlog(req.query.page, req.query.limit)
    res.send(result)
})

// 根据博客分类查询博客
router.get('/searchType', async(req, res) => {
    const result = await blogService.searchTypeBlog(req.query.typeId)
    res.send(result)
})

module.exports = router