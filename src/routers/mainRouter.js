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
const auth = require('../middlewares/auth')

router.get('/', async(req,res) => {

    try {
        const user = await User.findOne({
            include: [
                {model: Skill},
                {model: Education},
                {model: Experience},
                {model: Project, include: [Category]}
            ] 
        });
        res.render('site/views/index', {user})
    } catch(e) {
        console.log(e)
    }
   
})

router.get('/login', (req,res) => {
    
    const token = req.cookies.token

    if(token) {
        return res.redirect('/admin/profile')
    }
    
    console.log(req.user)

    res.render('site/views/login')
})

router.post('/login', async(req,res) => {

    try {
        const user = await User.findOne({where: {email: req.body.email}})
        
        if(!user) {
            return res.status(401).json({error: "Incorrect email or password!"})
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password) 

        if(!passwordMatch) {
            return res.status(401).json({error: "Incorrect email or password!"})
        }

        const token = jwt.sign({userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        
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
        res.status(200).send()
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.get('/detail/:id', async(req,res) => {
    
    try {
        const user = await User.findOne()
        const project = await Project.findByPk(req.params.id, {
            include: [
                {model: Category},
                {model: ProjectFiles}
            ]
        })
        res.render('site/views/project', {user, project})
    } catch(e) {
        console.log(e)
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