const express = require('express')
const router = new express.Router()
const db = require('../db/mysql')
const User = require('../models/user')
const email = require('../utils/email')

router.get('/', (req,res) => {

    res.render('index')
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
        await email.sendMail(message)
        res.status(200).send()
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router