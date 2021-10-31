const sequelize = require('./index.js');

// 模型
require('./user');
require('./blog');

(async function() {
    await sequelize.sync({
        alter: true
    });
    console.log(`所有模型同步成功!`);
})();