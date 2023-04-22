const Sequelize = require('sequelize');
const sequelize = require('../db/mysql')

const Notification = sequelize.define('notification', {
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_read: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Notification
