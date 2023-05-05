const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const email = require('../utils/email')
const bcrypt = require('bcrypt')
const Skill = require('../models/skills')
const Education = require('../models/education')
const Experience = require('../models/experience')
const Project = require('../models/projects')
const Category = require('../models/categories')
const ProjectFiles = require('../models/projectFiles')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const ProjectCategories = require('../models/projectCategories')
const checkConnection = require('../middlewares/checkConnection')
const Services = require('../models/services')
const Notification = require('../models/notifications')
const validator = require('validator')

router.get('/', checkConnection ,async(req,res) => {

    try {
        const user = await User.findOne({
            include: [
              { model: Skill },
              { model: Education },
              { model: Experience },
              {model: Services},
              {
                model: Project,
                include: [
                  {
                    model: ProjectCategories,
                    include: [Category],
                  },
                ],
              },
            ],
          });

          if(!user) {
            return res.render('site/views/create-user')
          }

          const categories = await Category.findAll()
          
        res.render('site/views/index', {user, categories})
    } catch(e) {
        console.log(e)
    }
   
})

router.get('/login', checkConnection,  (req,res) => {
    
    // const token = req.cookies.token

    // if(token) {
    //     return res.redirect('/admin/profile')
    // }
    

    res.render('site/views/login')
})

router.post('/login', checkConnection ,async(req,res) => {

    try {

        const email = req.body.email.trim();
        const user = await User.findOne({where: {email: email}})
        
        if(!user) {
            return res.status(401).json({error: "Incorrect email or password!"})
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password) 

        if(!passwordMatch) {
            return res.status(401).json({error: "Incorrect email or password!"})
        }

        const token = jwt.sign({userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' })
        
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Logged in successfully', user: user })

    } catch(e) {
        console.log(e)
    }

})

router.get('/logout', (req, res) => {

    // Clear the token cookie
    res.cookie('token', '', { expires: new Date(0) })
  
    // Redirect to the login page or any other page
    res.redirect('/login')
  })
  

router.post('/contact', async(req,res) => {

    const message = {
        from: 'turgut@turgutsalgin.site',
        to: 'turgutsalgin5534@gmail.com',
        subject: 'A New Message From Portfolio',
        text: req.body.message,
        html: `<p><b>From:</b> ${req.body.name}</p>
        <p><b>Email</b>: ${req.body.email}</p>
        <p><b>Subject</b>: ${req.body.subject}</p>
        <p><b>Message</b>: ${req.body.message}</p>`
      };

    try {
        await email.sendMail(message)
        const user = await User.findOne()
        
        const notification = new Notification({
            message: `You have a new email from ${req.body.name}`,
            type: "contact",
            is_read: false,
            UserId: user.id
        })

        await notification.save()

        res.status(200).send()
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.get('/detail/:id', checkConnection , async(req,res) => {
    
    try {
        const user = await User.findOne()
        const project = await Project.findByPk(req.params.id, {
            include: [
                {
                   model: ProjectCategories,
                   include: [Category]
                },
                {model: ProjectFiles}
            ]
        })
        res.render('site/views/project', {user, project})
    } catch(e) {
        console.log(e)
    }
    
})

router.post('/user/save', async(req,res) => {
    
    try {

        const { name, email, password, repassword } = req.body

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                status: false,
                message: 'Email should be in correct format'
            })
        }

        if(password != repassword) {
            
            return res.status(400).json({
                status: false,
                message: 'Password not match'
            })
        }

        const user = new User({name,email, password})
        user.password = await bcrypt.hash(password, 10)
        await user.save()

        res.status(201).json({
            status: true,
            message: 'Success!'
        })
    } catch(e) {
        console.log(e)
        res.status(400).json({
            status: false,
            message: 'An error occured'
        })
    }

})



module.exports = router