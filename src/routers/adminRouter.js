const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')

router.get('/', auth, (req,res) => {
    res.send('This is admin page')
})

router.get('/profile', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill}
        ]
    })

    res.render('admin/views/profile', {user})

})


router.get('/skills', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill}
        ]
    })

    res.render('admin/views/skills', {user})

})

module.exports = router