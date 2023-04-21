const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Project = require('../models/projects')
const slugify = require('slugify');
const multer = require('multer');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const uploadDirectory = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
      const ext = path.extname(file.originalname);
      cb(null, uniqueId + ext);
    }
});
  
const upload = multer({ storage: storage });

router.get('/all', auth, async(req,res) => {

    try {
        const projects = await Project.findAll()
        res.render('admin/views/project/projects', {projects})
    } catch(e) {
        console.log(e)
    }

})

router.get('/add', auth, (req,res) => {

    res.render('admin/views/project/add-project')

})

router.get('/edit/:id', auth, async(req,res) => {

    try {
        const project = await Project.findByPk(req.params.id)
        res.render('admin/views/project/edit-Project', {project})
    } catch(e) {
        console.log(e)
    }

})

router.post('/save', auth, upload.single('image'), async(req,res) => {

    try {
        const { title, client, url, date, description } = req.body;
        const image = req.file.filename
        const project = new Project({ title, client, url, date, description, image });
        project.slug = slugify(req.body.title, {
          lower: true,
          strict: true,
        });
        project.UserId = req.user.id;
        await project.save();
        res.redirect('/admin/project/all');
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

        if(project.image) {

            const path = uploadDirectory + '/' + project.image
            await fs.promises.unlink(path)
            
        }

        await project.destroy()

        return res.status(200).send()

    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }

}) 

module.exports = router
