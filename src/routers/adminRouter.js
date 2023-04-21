const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')

router.get('/', auth, (req,res) => {
    res.send('This is admin page')
})

router.get('/profile', auth, (req,res) => {

    res.render('admin/views/profile')

})

module.exports = router