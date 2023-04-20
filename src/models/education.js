const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Education = sequelize.define('education', {
    school: {
      type: Sequelize.STRING,
      allowNull: false
    },
    degree: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fieldOfStudy: {
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

module.exports = Education
