const nodemailer = require('nodemailer');

// 发送者邮箱配置
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '2460481461@qq.com',
        pass: 'ygaxnhpzumeaeafh'
    }
});


// 发送邮件
async function sendMail(title = '', html = '', path) {
    console.log('开始发送邮件');
    // 接收者配置
    let options = {
        from: '2460481461@qq.com',
        to: '3140944065@qq.com',
        subject: title,
        html
    };
    if (path) {
        options['attachments'] = [{
            filename: '服务器日志记录',
            path
        }]
    }
    return await transporter.sendMail(options).then(info => {
        console.log('发送成功')
        return true
    }).catch(err => {
        console.log('发送失败', err);
        return
    })
};

module.exports = {
    sendMail
};