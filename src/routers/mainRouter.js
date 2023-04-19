const express = require('express')
const router = new express.Router()
const db = require('../db/mysql')
const User = require('../models/user')
const email = require('../utils/email')

router.get('/', (req,res) => {

    res.render('index')
})

module.exports = router