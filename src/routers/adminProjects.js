const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Project = require('../models/projects')
const slugify = require('slugify');

router.get('/all', auth, async(req,res) => {

    try {
        const projects = await Project.findAll()
        res.render('admin/views/project/projects', {projects})
    } catch(e) {
        console.log(e)
    }

})

router.get('/add', auth, (req,res) => {

    res.render('admin/views/project/add-Project')

})

router.get('/edit/:id', auth, async(req,res) => {

    try {
        const project = await Project.findByPk(req.params.id)
        res.render('admin/views/project/edit-Project', {project})
    } catch(e) {
        console.log(e)
    }

})

router.post('/save', auth,  async(req,res) => {

    try {
        const project = new Project(req.body)
        project.slug = slugify(req.body.title, {
            lower: true,
            strict: true
          });
        project.UserId = req.user.id
        await project.save()
        res.redirect('/admin/project/all')
    } catch(e) {
        console.log(e)
    }

})

router.post('/update', auth,  async(req,res) => {

    const id = req.body.id

    try {

        const project = await Project.findByPk(id)

        project.title = req.body.title;
        project.client = req.body.client;
        project.url = req.body.url;
        project.date = req.body.date;
        project.description = req.body.description;
        project.slug = slugify(req.body.title, {
            lower: true,
            strict: true
          });
        await project.save()

        res.redirect('/admin/project/all')

    } catch(e) {
        console.log(e)
    }

})

router.delete('/delete/:id', async(req,res) => {

    try {

        const project = await Project.findByPk(req.params.id)

        if(!project) {
            return res.status(401).send()
        }

        await project.destroy()

        return res.status(200).send()

    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }

}) 

module.exports = router
