const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')
const adminSkillsRouter = require('./adminSkills')
const adminEducationRouter = require('./adminEducations')
const adminExperienceRouter = require('./adminExperiences')

router.get('/', auth, (req,res) => {
    res.send('This is admin page')
})

router.get('/profile', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill}
        ]
    })

    res.render('admin/views/profile/profile', {user})

})

router.use('/skills', adminSkillsRouter)
router.use('/education', adminEducationRouter)
router.use('/experience', adminExperienceRouter)

module.exports = router