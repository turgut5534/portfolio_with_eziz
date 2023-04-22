const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Project = require('../models/projects')
const slugify = require('slugify');
const multer = require('multer');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const ProjectFiles = require('../models/projectFiles');
const ProjectCategories = require('../models/projectCategories');
const Category = require('../models/categories');

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
        const project = await Project.findByPk(req.params.id, {
            include: [
              {model: ProjectFiles}, 
              {model: ProjectCategories}
            ]
        })

        const categories = await Category.findAll()
        res.render('admin/views/project/edit-project', {project, categories})
    } catch(e) {
        console.log(e)
    }

})

router.delete('/projectfile/delete/:id', async(req,res) => {

    try {

        const file = await ProjectFiles.findByPk(req.params.id)

        const path = uploadDirectory + '/' + file.file
        await fs.promises.unlink(path)

        await file.destroy()

        res.status(200).send()

    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/save', auth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'files[]', maxCount: 10 }]), async (req, res) => {
    try {
      const { title, client, url, date, description } = req.body;
      let image = null;
      let files = [];
  
      if (req.files['image']) {
        image = req.files['image'][0].filename;
      }
  
      const project = new Project({ title, client, url, date, description, image });
      project.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
      project.UserId = req.user.id;
      await project.save();

      if (req.files['files[]']) {

        files = req.files['files[]']

        for (const file of files) {

            const projectFile = new ProjectFiles({
              file: file.filename,
              extension: path.extname(file.originalname),
              projectId: project.id
            });
            await projectFile.save();
          }
      }

      res.redirect('/admin/project/all');
    } catch(e) {
      console.log(e);
    }
  });

router.post('/update', auth,  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'files[]', maxCount: 10 }]),  async(req,res) => {

    try {

        let files = [];

        const { id, categories } = req.body

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
   
        if (req.files['image']) {

            const path = uploadDirectory + '/' + project.image
            await fs.promises.unlink(path)
            
            image = req.files['image'][0].filename;
            project.image = image
        }

        await project.save()
        
      if (req.files['files[]']) {

        files = req.files['files[]']

        for (const file of files) {

            const projectFile = new ProjectFiles({
              file: file.filename,
              extension: path.extname(file.originalname),
              projectId: project.id
            });
            await projectFile.save();
          }
      }

      // ------------------------------

      const projectCategories = await ProjectCategories.findAll({
        where: { projectId: project.id },
        include: [Category]
      });
  
      const categoryIDs = projectCategories.map(category => category.category.id);


      // get unchecked tags
      const checkedCategories = categories 
      let checkedCategoryIds = [] 
  

      if(checkedCategories != undefined && Array.isArray(checkedCategories) ) {
        checkedCategoryIds.push(checkedCategories.map(id => parseInt(id)));
      }
  

      for(i=0; i<categoryIDs.length; i++) {
  
        if(!checkedCategoryIds.includes(categoryIDs[i])) {
          await ProjectCategories.destroy({ where: { projectId: project.id, categoryId: categoryIDs[i] } })
        }
  
      }

  
      if(categories) {
        for(const category of categories) {
  
            const checkProjectCatgory = await ProjectCategories.findOne({ where: { projectId: project.id, categoryId: category } });
  
            if(!checkProjectCatgory) {
                await ProjectCategories.create({
                  projectId : project.id,
                  categoryId: category
                })
            }

        }
      }

      //-------------------------------
        
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

        const files = await ProjectFiles.findAll({where: {projectId: project.id}})
        console.log(files)

        if(files) {
            for(const f of files) {
                const path = uploadDirectory + '/' + f.file
                await fs.promises.unlink(path)
            }
        }

        await project.destroy()

        return res.status(200).send()

    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }

}) 

module.exports = router
