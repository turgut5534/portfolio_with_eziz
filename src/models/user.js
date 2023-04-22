const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')
const Skill = require('./skills')
const Experience = require('./experience')
const Education = require('./education');
const Project = require('./projects');
const Activities = require('./activities');
const Services = require('./services');

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
  User.hasMany(Education, { foreignKey: 'UserId' });
  User.hasMany(Experience);
  User.hasMany(Project);
  User.hasMany(Activities)
  User.hasMany(Services)

  Skill.belongsTo(User);
  Education.belongsTo(User)
  Experience.belongsTo(User)
  Project.belongsTo(User)
  Activities.belongsTo(User)
  Services.belongsTo(User)

  // sequelize.sync()

  module.exports = User
  