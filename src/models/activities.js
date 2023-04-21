const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');

const Activities = sequelize.define('activity', {
    action: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
      }
  });


  module.exports = Activities