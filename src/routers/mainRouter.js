const express = require('express')
const router = new express.Router()
const db = require('../db/mysql')
const User = require('../models/user')
const email = require('../utils/email')
const bcrypt = require('bcrypt')

router.get('/', async(req,res) => {

    try {
        const user = await User.findOne()
        res.render('site/views/index', {user})
    } catch(e) {
        console.log(e)
    }
   
})

router.get('/login', (req,res) => {
    
    res.render('site/views/login')
})

router.post('/send-email', async(req,res) => {

    const message = {
        from: 'turgut@turgutsalgin.site',
        to: 'turgutsalgin5534@gmail.com',
        subject: 'A New Message From Portfolio',
        text: req.body.message,
        html: req.body.message
      };

    try {
        // await email.sendMail(message)
        res.status(200).send()
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/user/save', async(req,res) => {

    const user = req.body
    
    try {
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user)
        res.status(201).send()
    } catch(e) {
        console.log(e)
    }

})

module.exports = router