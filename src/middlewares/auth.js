const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Notification = require('../models/notifications')
const moment = require('moment')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new Error('No token found')
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const user = await User.findByPk(userId)
    req.user = user

    res.locals.user = user

    const notifications = await Notification.findAll({ where: { UserId: user.id } })

    res.locals.notifications = notifications
    res.locals.moment = moment

    next()
  } catch (err) {
 
    console.log(err)
    res.redirect('/login')
  }
}

module.exports = authMiddleware