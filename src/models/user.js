const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')
const Skill = require('./skills')

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
    address : {
      type: Sequelize.TEXT
    },
    image: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATE
    },
    website: {
      type: Sequelize.STRING
    },
    degree: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  User.hasMany(Skill);
  Skill.belongsTo(User);

  // sequelize.sync()

  module.exports = User
  