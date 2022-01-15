const { Sequelize } = require('sequelize')

/**
 * TODO: 当前Mac本地的数据库为: one 密码: 12345678
 * TODO: 服务器的数据库为: all 密码: 123456
 */
module.exports = new Sequelize('one', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: null
})