const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new Error('No token found')
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    // You can use the userId to retrieve the user from the database and attach it to the request object
    const user = await User.findByPk(userId)
    req.user = user

    res.locals.user = user

    next()
  } catch (err) {
    res.redirect('/login')
  }
}

module.exports = authMiddleware