const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');
const ProjectFiles = require('./projectFiles');
const Category = require('./categories');

const Project = sequelize.define('project', {
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    client: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE
    }
  });

  Project.hasMany(ProjectFiles)
  Project.hasMany(Category)
  ProjectFiles.belongsTo(Project)
  Category.belongsTo(Project)

  module.exports = Project