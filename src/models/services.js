const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Services = sequelize.define('service', {
    icon: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Services
