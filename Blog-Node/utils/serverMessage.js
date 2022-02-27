const os = require('os');

module.exports = {
    systemType: os.type,
    systemVersion: os.release,
    systemOperationHours: os.uptime,
    systemTotalMemory: os.totalmem,
    systemIdleMemory: os.freemem
}