// 同步模型
require('./models/init')

// 运行接口
require('./route/init')

// 其他操作
// 定时发送邮件
const { uid, sendLog } = require('./utils/timingLog');
uid.timingRefresh();
setInterval(() => {
    sendLog();
}, 604800000)