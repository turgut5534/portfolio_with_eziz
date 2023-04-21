const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')


router.get('/all', auth, async (req, res) => {
  try {
    const skills = await Skill.findAll()

    res.render('admin/views/skills', { skills })
  } catch (e) {
    res.status(500).send()
  }
})


router.post('/save', auth, async (req, res) => {

  const skill = new Skill(req.body)

  try {
    const newSkill = await skill.save()
    res.status(201).json({skill: newSkill})
  } catch (e) {
    res.status(400).send()
  }
})

// Route to delete a skill
router.delete('/delete/:id', auth, async (req, res) => {
  const id = req.params.id
  try {
    const skill = await Skill.findByPk(id)
    if (!skill) {
      return res.status(404).send()
    }
    await skill.destroy()
    res.status(200).send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

router.post('/update', auth, async (req, res) => {

  const id = req.body.id

  try {
    const skill = await Skill.findByPk(id)

    if(!skill) {
      return res.status(401).send()
    }

    skill.title = req.body.title
    skill.rate = req.body.rate
    await skill.save()

    res.status(201).json({skill: skill})
  } catch (e) {
    console.log(e)
    res.status(500).json({error: 'Failed to update skill'})
  }
})

module.exports = router
