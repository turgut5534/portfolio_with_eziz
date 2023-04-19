const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    linkedin: {
      type : Sequelize.STRING
    },
    instagram : {
      type: Sequelize.STRING
    },
    github : {
      type: Sequelize.STRING
    },
    about : {
      type: Sequelize.TEXT
    },
    image: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  // sequelize.sync()

  module.exports = User
  