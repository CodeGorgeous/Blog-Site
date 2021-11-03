const sequelize = require('./models')

async function start() {
    // try {
    //     await sequelize.authenticate();
    //     console.log('数据库链接成功')
    //     console.log('开始数据库操作')
    //     await require('./init')
    // } catch (error) {
    //     console.log(`数据库链接失败, 错误原因: ${error}`)
    // }
    await sequelize.authenticate();
    console.log('数据库链接成功')
    await require('./init')
}

start()