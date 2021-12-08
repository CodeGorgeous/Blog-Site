const fs = require('fs')
const { resolve } = require('path')

// 日志记录中间件
module.exports = {
    logRecord(req, res, next) {
        // 记录日志
        if (req.method !== 'GET') { // GET请求并不重要无需记录, 需要记录的是post\put\delete等关键操作
            const text = `<p>[${new Date()}] [${req.method}] [${req.query['uid'] || req.body['uid']}] [${req.url}]</p>\n`
            const path = resolve(__dirname, '..', '..', 'resources', 'log', 'log.log');
            fs.appendFileSync(path, text)
        }
        next();
    }
}