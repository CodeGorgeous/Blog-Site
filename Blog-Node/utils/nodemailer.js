const nodemailer = require('nodemailer');

// 发送者邮箱配置
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: false,
    auth: {
        user: '2460481461@qq.com',
        pass: 'ygaxnhpzumeaeafh'
    }
});

// 接收者配置
let options = {
    from: '2460481461@qq.com',
    to: '3140944065@qq.com',
    subject: '1',
    text: ''
};

// 发送邮件
function sendMail() {
    console.log('开始发送邮件');
    transporter.sendMail(options).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => {
        console.log('错误', err)
    })
};

module.exports = {
    sendMail
};