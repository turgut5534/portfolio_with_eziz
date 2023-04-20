const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Skill = sequelize.define('skill', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Skill
