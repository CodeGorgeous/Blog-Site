const Blog = require('../models/blog')
const User = require('../models/user')
const BlogType = require('../models/blogType')
const { createResp } = require('../utils/createResp.js')
const marked = require('marked')
const { v4 } = require('uuid')
const fs = require('fs')
const { resolve } = require('path')

module.exports = {
    // 获取全部博客类型
    async getAllBlogTypes() {
        try {
            let result = await BlogType.findAll()
            if (!result) return createResp('fail', '获取失败', {})
            return createResp('success', '获取成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 新增博客分类
    async postBlogType(typeName, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {})

            result = await BlogType.create({
                typeName
            })

            if (!result) return createResp('fail', '新增失败', {})
            return createResp('success', '新增成功', {})
        } catch (error) {

        }
    },
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
    async postBlogs(name, introduce, timer, url, author, codeUrl, tags, text, typeId, uid) {
        if (!name || !timer || !url || !author || !tags || !introduce || !typeId) {
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
        let html = marked(text);
        // html上拼接样式
        html += fs.readFileSync(resolve(__dirname, '..', 'resources', 'css', 'index.html'), 'utf-8');
        // 创建一个用于存储markdown和html的resources文件夹(这里进行了手动创建不进行自动化创建)
        // 在resources/markdown下创建markdown文件
        fs.writeFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${uuid}.md`), text)
        fs.writeFileSync(resolve(__dirname, '..', 'resources', 'html', `${uuid}.html`), html)
        const result = await Blog.create({
            name,
            introduce,
            createTimer: timer,
            occupyImg: url,
            author,
            githubUrl: codeUrl,
            tags,
            markdownName: uuid + '.md',
            htmlName: uuid + '.html',
            type_id: typeId
        })
        if (result) {
            return createResp('success', '新增成功', {})
        } else {
            return createResp('fail', '新增失败', {})
        }
    },
    // 修改博客
    async putBlog(text, id, typeId, uid) {
        const newResult = await User.findOne({
            where: {
                spreadCode: uid
            }
        });
        if (!newResult) {
            return createResp('fail', '用户uid不正确', {})
        }
        let result = await Blog.findOne({
            where: {
                id
            }
        });
        if (result) {
            let html = marked(text);
            // html上拼接样式
            html += fs.readFileSync(resolve(__dirname, '..', 'resources', 'css', 'index.html'), 'utf-8');
            // 则进行更改
            fs.writeFileSync(resolve(__dirname, '..', 'resources', 'markdown', `${result.dataValues.markdownName}`), text)
            fs.writeFileSync(resolve(__dirname, '..', 'resources', 'html', `${result.dataValues.htmlName}`), html)
            result = await Blog.update({
                type_id: typeId
            }, {
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '修改失败', {})
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
    },
    // 根据博客分类查询博客
    async searchTypeBlog(typeId) {
        try {
            let result = await Blog.findAll({
                where: {
                    type_id: typeId
                }
            })
            if (!result) return createResp('fail', '获取失败', {})
            return createResp('success', '获取成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 分页查询博客
    async pageGetBlog(page = 1, limit = 2) {
        try {
            let result = await Blog.findAndCountAll({
                order: [
                    ['id', 'DESC']
                ],
                offset: (page - 1) * limit,
                limit: +limit
            })
            if (!result) return createResp('fail', '获取失败', {})
            return createResp('success', '获取成功', result)
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 修改博客分类
    async putBlogType(typeId, name, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {})

            result = await BlogType.update({
                typeName: name
            }, {
                where: {
                    id: typeId
                }
            })
            if (!result) return createResp('fail', '修改失败', {})
            return createResp('success', '修改成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    },
    // 删除博客分类
    async deleteBlogType(id, uid) {
        try {
            let result = await User.findOne({
                where: {
                    spreadCode: uid
                }
            });
            if (!result) return createResp('fail', '该操作人不存在', {});
            // 先查询该分类下是否还有文章
            result = await Blog.findAll({
                where: {
                    type_id: id
                }
            })
            if (result.length > 0) {
                return createResp('fail', '该分类下还有文章, 请处理后在进行尝试!', {})
            }
            // 进行删除
            result = await BlogType.destroy({
                where: {
                    id
                }
            })
            if (!result) return createResp('fail', '删除失败', {})
            return createResp('success', '删除成功', {})
        } catch (error) {
            return createResp('fail', '未知错误', error)
        }
    }
}