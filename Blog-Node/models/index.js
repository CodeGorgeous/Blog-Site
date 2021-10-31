const { Sequelize } = require('sequelize')

module.exports = new Sequelize('all', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: null
})