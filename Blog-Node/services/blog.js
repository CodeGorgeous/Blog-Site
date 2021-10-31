const Blog = require('../models/blog')
const { createResp } = require('../utils/createResp.js')
const marked = require('marked')

module.exports = {
    // 获取全部博客
    async getAllBlogs() {
        const result = await Blog.findAndCountAll()
        if (result.rows.length > 0) {
            return createResp('success', '获取成功', {
                total: result.count,
                list: result.rows
            })
        } else {
            return createResp('fail', '获取失败', {})
        }
    },
    // 新增博客
    async postBlogs(name, timer, url, author, codeUrl, tags, text) {
        if (!name || !timer || !url || !author || !tags) {
            return createResp('fail', '信息缺失', {})
        }
        // 利用转换markdown为html
        const html = marked(text)
        console.log('Markdown-----------------', text)
        console.log('HTML-----------------', html)
        const result = await Blog.create({
            name,
            createTimer: timer,
            occupyImg: url,
            author,
            githubUrl: codeUrl,
            tags,
            markdownText: text,
            htmlText: html
        })
        if (result) {
            return createResp('success', '新增成功', {})
        } else {
            return createResp('fail', '新增失败', {})
        }
    },
    // 修改博客
    putBlog() {
        return createResp('success', '修改成功', {})
    },
    // 删除博客
    deleteBlog() {
        return createResp('success', '删除成功', {})
    }
}