const express = require('express')
const router = new express.Router()
const db = require('../db/mysql')
const User = require('../models/user')
const email = require('../utils/email')
const bcrypt = require('bcrypt')
const Skill = require('../models/skills')
const Education = require('../models/education')
const Experience = require('../models/experience')
const Project = require('../models/projects')
const Category = require('../models/categories')
const ProjectFiles = require('../models/projectFiles')

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
    
    res.render('site/views/login')
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