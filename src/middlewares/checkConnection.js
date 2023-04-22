const db = require('../db/mysql')

const checkConnection = async(req,res,next) => {
    try {
      await db.authenticate()
      next()
    } catch(e) {
      return res.render('site/views/maintanence')
    }
  }
  
module.exports = checkConnection