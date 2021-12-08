const { v4 } = require('uuid')
const { sendMail } = require('./nodemailer')
const User = require('../models/user')
const { resolve } = require('path')
const fs = require('fs')

class Uid {
    constructor(code = '167519') {
        this.code = code;
    };
    // 获取当前code
    getCode() {
        return this.code;
    };
    // 更新状态码
    async refresh() {
        const code = v4().slice(0, 6);
        // 更新状态码的前需要替换数据库中之前的code
        let result = await User.update({
            code
        }, {
            where: {
                code: this.code
            }
        });
        // 如果替换失败则重新尝试
        if (!result) {
            this.refresh()
            return
        } else {
            this.code = code;
            this.sendCode()
        }
    };
    // 发送新的状态码至管理员邮箱
    sendCode() {
        const result = sendMail('邀请码更新通知', `万能邀请码: <h1>${this.code}</h1>`)
        if (!result) {
            // 邮件发送失败, 则需要重新触发发送邮件
            this.sendCode()
        }
    };
    // 开启自动定时更新邀请码
    // 默认30天更新一次
    timingRefresh(time = 2592000000) {
        const timer = setInterval(() => {
            this.refresh()
        }, time)
    }
}

function sendLog() {
    const path = resolve(__dirname, '..', 'resources', 'log', 'log.log')
    const text = fs.readFileSync(path, 'utf-8')
    const result = sendMail('服务器管理日志', `请查收这段时间来服务器所发生的情况:
    <div>
        ${text}
    </div>
    `)
    if (!result) {
        // 发送失败则重新尝试
        sendLog()
        return
    } else {
        fs.writeFileSync(path, '')
    }
}

module.exports = {
    uid: new Uid(),
    sendLog
}