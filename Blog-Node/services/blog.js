const Blog = require('../models/blog')
const User = require('../models/user')
const { createResp } = require('../utils/createResp.js')
const marked = require('marked')
const { v4 } = require('uuid')
const fs = require('fs')
const { resolve } = require('path')

module.exports = {
    // 获取全部博客
    async getAllBlogs() {
        const result = await Blog.findAndCountAll()
        if (result.rows.length >= 0) {
            const newList = result.rows.map((item) => {
                return {
                    ...item.dataValues,
                    markdownText: fs.readFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${item.dataValues.markdownName}`), 'utf-8'),
                    htmlText: fs.readFileSync(resolve(__dirname, '..', 'resources', 'html', `${item.dataValues.htmlName}`), 'utf-8')
                }
            })
            return createResp('success', '获取成功', {
                total: result.count,
                list: newList
            })
        } else {
            return createResp('fail', '获取失败', {})
        }
    },
    // 新增博客
    async postBlogs(name, timer, url, author, codeUrl, tags, text, uid) {
        if (!name || !timer || !url || !author || !tags) {
            return createResp('fail', '信息缺失', {})
        }
        const newResult = await User.findOne({
            where: {
                spreadCode: uid
            }
        })
        if (!newResult) {
            return createResp('fail', '用户uid不正确', {})
        }
        const uuid = v4().slice(0, 6);
        // 利用转换markdown为html
        const html = marked(text);
        // 创建一个用于存储markdown和html的resources文件夹(这里进行了手动创建不进行自动化创建)
        // 在resources/markdown下创建markdown文件
        fs.writeFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${uuid}.md`), text)
        fs.writeFileSync(resolve(__dirname, '..', 'resources', 'html', `${uuid}.html`), html)
        const result = await Blog.create({
            name,
            createTimer: timer,
            occupyImg: url,
            author,
            githubUrl: codeUrl,
            tags,
            markdownName: uuid + '.md',
            htmlName: uuid + '.html'
        })
        if (result) {
            return createResp('success', '新增成功', {})
        } else {
            return createResp('fail', '新增失败', {})
        }
    },
    // 修改博客
    async putBlog(text, id, uid) {
        const newResult = await User.findOne({
            where: {
                spreadCode: uid
            }
        });
        if (!newResult) {
            return createResp('fail', '用户uid不正确', {})
        }
        const result = await Blog.findOne({
            where: {
                id
            }
        });
        if (result) {
            const html = marked(text);
            // 则进行更改
            fs.writeFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${result.dataValues.markdownName}`), text)
            fs.writeFileSync(resolve(__dirname, '..', 'resources', 'html', `${result.dataValues.htmlName}`), html)
            return createResp('success', '修改成功', {})
        } else {
            // 该数据不存在, 无法进行更改
            return createResp('fail', `未找到ID为${id}的博客`, {})
        }
    },
    // 删除博客
    async deleteBlog(id, uid) {
        const newResult = await User.findOne({
            where: {
                spreadCode: uid
            }
        })
        if (!newResult) {
            return createResp('fail', '用户uid不正确', {})
        }
        // 先看一遍该id数据行是否存在
        let result = await Blog.findOne({
            where: {
                id
            }
        })
        if (!result) return createResp('fail', `未找到ID为${id}的博客`, {});
        // 同步删除resources下的html和md
        fs.unlinkSync(resolve(__dirname, '..', 'resources', 'markdown', `${result.dataValues.markdownName}`))
        fs.unlinkSync(resolve(__dirname, '..', 'resources', 'html', `${result.dataValues.htmlName}`))
            // 然后删除掉数据库中保存的数据
        result = await Blog.destroy({
            where: {
                id
            }
        })

        if (result) {
            return createResp('success', '删除成功', {})
        } else {
            return createResp('fail', '删除失败', {})
        }
    },
    // 根据ID查询某篇博客
    async searchBlog(id) {
        if (typeof + id !== 'number') {
            return createResp('fail', 'id类型错误, 应为一个number', {})
        }
        const result = await Blog.findOne({
            where: {
                id
            }
        });
        // 成功找到
        if (result) {
            const newData = {
                ...result.dataValues,
                markdownText: fs.readFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${result.dataValues.markdownName}`), 'utf-8'),
                htmlText: fs.readFileSync(resolve(__dirname, '..', 'resources', 'html', `${result.dataValues.htmlName}`), 'utf-8')
            }
            return createResp('success', '查询成功', newData)
        } else { // 未找到
            return createResp('fail', `未找到ID为${id}的博客`, {})
        }
    }
}