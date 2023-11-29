
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Blog = sequelize.define('Blog', {
  blogTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  blogAuthor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  blogContent: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Blog;
