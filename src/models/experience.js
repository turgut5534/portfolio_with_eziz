const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Experience = sequelize.define('experience', {
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
  });

  module.exports = Experience