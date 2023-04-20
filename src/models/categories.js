const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
      }
  });

  module.exports = Category