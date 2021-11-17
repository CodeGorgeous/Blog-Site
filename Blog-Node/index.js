const sequelize = require('./models')

async function start() {
    try {
        await sequelize.authenticate();
        console.log('数据库链接成功')
        await require('./init')
    } catch (error) {
        console.log(`发生错误, 错误原因: ${error}`)
    }
}

start()