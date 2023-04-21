const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Education = require('../models/education')

router.get('/all', auth, async(req,res) => {

    try {
        const educations = await Education.findAll()
        res.render('admin/views/education/educations', {educations})
    } catch(e) {
        console.log(e)
    }

})

router.get('/add', auth, (req,res) => {

    res.render('admin/views/education/add-education')

})

router.get('/edit/:id', auth, async(req,res) => {

    try {
        const education = await Education.findByPk(req.params.id)
        res.render('admin/views/education/edit-education', {education})
    } catch(e) {
        console.log(e)
    }

})

router.post('/save', auth,  async(req,res) => {

    try {
        const education = new Education(req.body)
        education.UserId = req.user.id
        await education.save()
        res.redirect('/admin/education/all')
    } catch(e) {
        console.log(e)
    }

})

router.post('/update', auth,  async(req,res) => {

    const id = req.body.id

    try {

        const education = await Education.findByPk(id)

        education.school = req.body.school;
        education.degree = req.body.degree;
        education.fieldOfStudy = req.body.fieldOfStudy;
        education.startDate = req.body.startDate;
        education.endDate = req.body.endDate;
        education.description = req.body.description;
        await education.save()

        res.redirect('/admin/education/all')

    } catch(e) {
        console.log(e)
    }

})

router.delete('/delete/:id', async(req,res) => {

    try {

        const education = await Education.findByPk(req.params.id)

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
