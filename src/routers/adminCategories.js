const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Category = require('../models/categories')
const Activities = require('../models/activities')
const slugify = require('slugify');

router.get('/all', auth, async (req, res) => {

  try {
    const categories = await Category.findAll()

    res.render('admin/views/category/categories', { categories })
  } catch (e) {
    res.status(500).send()
  }
})


router.post('/save', auth, async (req, res) => {

  const category = new Category(req.body)
  category.slug = slugify(req.body.name, {
    lower: true,
    strict: true,
  });
  category.UserId = req.user.id

  try {
    const newCategory = await category.save()

    await Activities.create({
      action: req.user.name+ " added a new category",
      description: `Your new is category name is: ${newCategory.name}`,
      UserId: req.user.id
    })

    res.status(201).json({category: newCategory})
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

// Route to delete a skill
router.delete('/delete/:id', auth, async (req, res) => {

  try {

    const category = await Category.findByPk(req.params.id)

    if (!category) {
      return res.status(404).send()
    }

    await Activities.create({
      action: req.user.name+ " deleted a category",
      description: `Your deleted category name is: ${category.name} `,
      UserId: req.user.id
    })

    await category.destroy()

    res.status(200).send()

  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

router.post('/update', auth, async (req, res) => {

  try {
    const category = await Category.findByPk(req.body.id)
    const name = category.name

    if(!category) {
      return res.status(401).send()
    }

    category.name = req.body.name
    category.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    await category.save()

    await Activities.create({
      action: req.user.name+ " updated a category",
      description: `Your updated a category name from ${name} to ${category.name}`,
      UserId: req.user.id
    })

    res.status(201).json({category: category})

  } catch (e) {
    console.log(e)
    res.status(500).json({error: 'Failed to update category'})
  }
})

module.exports = router
