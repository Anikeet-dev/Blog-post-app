const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-post-app', 'root', 'trailing',{
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
    