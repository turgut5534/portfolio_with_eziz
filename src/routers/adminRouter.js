const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')
const adminSkillsRouter = require('./adminSkills')
const adminEducationRouter = require('./adminEducations')
const adminExperienceRouter = require('./adminExperiences')
const adminProjectRouter = require('./adminProjects')
const adminServiceRouter = require('./adminServices')
const adminCategoryRouter = require('./adminCategories')
const Activities = require('../models/activities')
const moment = require('moment');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path')

const uploadDirectory = path.join(__dirname, '../../uploads/user')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/user/')
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
      const ext = path.extname(file.originalname);
      cb(null, uniqueId + ext);
    }
});
  
const upload = multer({ storage: storage });

router.get('/', auth, (req,res) => {
    res.send('This is admin page')
})

router.get('/profile', auth, async(req,res) => {

    const url = req.headers.host 
    console.log(url)

    const user = await User.findOne({
        include: [
            {model: Skill},
            {
                model: Activities,
                order: [['createdAt', 'DESC']],
                limit: 10,
            }
        ]
    })

    res.render('admin/views/profile/profile', {user, url})

})

router.get('/edit-profile', auth, async(req,res) => {

    const user = await User.findOne({
        include: [
            {model: Skill},
            {model: Activities}
        ]
    })

    res.render('admin/views/profile/edit-profile', {user})

})

router.post('/profile/save', auth, upload.single('image'), async(req,res) => {

    const user = await User.findOne()

    const { name, email, phone, github, instagram, linkedin, birthday, degree, website, about } = req.body

    user.name = name
    user.email = email
    user.phone = phone
    user.github = github
    user.instagram = instagram
    user.linkedin = linkedin
    user.birthday = birthday
    user.degree = degree
    user.website = website
    // user.address = req.body.address
    user.about = req.body.about
    

    if (req.file) {

        try {
            const path = uploadDirectory + '/' + user.image
            await fs.promises.unlink(path)
        } catch(e) {
            console.log('it is okay')
        }
 

        user.image = req.file.filename
    }

    await user.save()

    res.redirect('/admin/profile')

})


router.use('/skills', adminSkillsRouter)
router.use('/education', adminEducationRouter)
router.use('/experience', adminExperienceRouter)
router.use('/project', adminProjectRouter)
router.use('/service', adminServiceRouter)
router.use('/category', adminCategoryRouter)

module.exports = router