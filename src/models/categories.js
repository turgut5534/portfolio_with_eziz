const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');
const ProjectCategories = require('./projectCategories');

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

  Category.hasMany(ProjectCategories)
  ProjectCategories.belongsTo(Category)

  module.exports = Category