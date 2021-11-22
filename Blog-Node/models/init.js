const sequelize = require('./index.js');

// 模型
require('./user');
require('./blog');
require('./imageTypes');
require('./image');
require('./resourcesType');
require('./resources');
require('./classification');
require('./title');

(async function() {
    // 建立表关系
    require('./asyncModels')
    await sequelize.sync({
        alter: true
    });
    console.log(`所有模型同步成功!`);
})();