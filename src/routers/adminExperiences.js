const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Experience = require('../models/experience')

router.get('/all', auth, async(req,res) => {

    try {
        const experiences = await Experience.findAll()
        res.render('admin/views/experience/experiences', {experiences})
    } catch(e) {
        console.log(e)
    }

})

router.get('/add', auth, (req,res) => {

    res.render('admin/views/experience/add-experience')

})

router.get('/edit/:id', auth, async(req,res) => {

    try {
        const experience = await Experience.findByPk(req.params.id)
        res.render('admin/views/experience/edit-experience', {experience})
    } catch(e) {
        console.log(e)
    }

})

router.post('/save', auth,  async(req,res) => {

    try {
        const experience = new Experience(req.body)
        experience.UserId = req.user.id
        await experience.save()
        res.redirect('/admin/experience/all')
    } catch(e) {
        console.log(e)
    }

})

router.post('/update', auth,  async(req,res) => {

    const id = req.body.id

    try {

        const experience = await Experience.findByPk(id)

        experience.company = req.body.company;
        experience.title = req.body.title;
        experience.location = req.body.location;
        experience.startDate = req.body.startDate;
        experience.endDate = req.body.endDate;
        experience.description = req.body.description;
        await experience.save()

        res.redirect('/admin/experience/all')

    } catch(e) {
        console.log(e)
    }

})

router.delete('/delete/:id', async(req,res) => {

    try {

        const education = await Experience.findByPk(req.params.id)

        if(!education) {
            return res.status(401).send()
        }

        await education.destroy()

        return res.status(200).send()

    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }

}) 

module.exports = router
