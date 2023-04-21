const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');
const ProjectFiles = require('./projectFiles');
const ProjectCategories = require('./projectCategories');

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
  Project.hasMany(ProjectCategories)
  ProjectFiles.belongsTo(Project)
  ProjectCategories.belongsTo(Project)


  module.exports = Project