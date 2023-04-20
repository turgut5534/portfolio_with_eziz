const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');
const Category = require('./categories');

const ProjectFiles = sequelize.define('project_file', {
    file: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extension: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  module.exports = ProjectFiles