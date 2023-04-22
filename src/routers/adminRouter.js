const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')
const adminSkillsRouter = require('./adminSkills')
const adminEducationRouter = require('./adminEducations')
const adminExperienceRouter = require('./adminExperiences')
const adminProjectRouter = require('./adminProjects')
const Activities = require('../models/activities')
const moment = require('moment');

router.get('/', auth, (req,res) => {
    res.send('This is admin page')
})

router.get('/profile', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill},
            {model: Activities}
        ]
    })

    res.render('admin/views/profile/profile', {user, moment})

})

router.get('/profile/edit', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill},
            {model: Activities}
        ]
    })

    res.render('admin/views/profile/edit-profile', {user})

})

router.post('/profile/save', auth, async(req,res) => {

    const user = await User.findOne()

    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.github = req.body.github
    user.instagram = req.body.instagram
    user.linkedin = req.body.linkedin
    user.birthday = req.body.birthday
    user.degree = req.body.degree
    user.website = req.body.website
    // user.address = req.body.address
    user.about = req.body.about

    await user.save()

    res.redirect('/admin/profile')

})


router.use('/skills', adminSkillsRouter)
router.use('/education', adminEducationRouter)
router.use('/experience', adminExperienceRouter)
router.use('/project', adminProjectRouter)

module.exports = router