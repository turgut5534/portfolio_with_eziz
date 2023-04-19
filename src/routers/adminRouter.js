const express = require('express')
const router = new express.Router()
const isAuthorized = require('../middlewares/auth')

router.get('/', isAuthorized, (req,res) => {
    res.send('This is admin page')
})

module.exports = router