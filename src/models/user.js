const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const User = sequelize.define('User', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  module.exports = User
  