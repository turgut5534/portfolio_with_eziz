const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Skill = require('../models/skills')
const User = require('../models/user')
const Activities = require('../models/activities')


router.get('/all', auth, async (req, res) => {

  try {
    const skills = await Skill.findAll()

    res.render('admin/views/skills/skills', { skills })
  } catch (e) {
    res.status(500).send()
  }
})


router.post('/save', auth, async (req, res) => {

  const skill = new Skill(req.body)
  skill.UserId = req.user.id

  try {
    const newSkill = await skill.save()

    await Activities.create({
      action: req.user.name+ " added a new skill",
      description: `Your new is skill name is: ${newSkill.title} and its rate is: ${newSkill.rate} `,
      UserId: req.user.id
    })

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

    await Activities.create({
      action: req.user.name+ " deleted a skill",
      description: `Your deleted skill name is: ${skill.title} and its rate is: ${skill.rate} `,
      UserId: req.user.id
    })

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
    const title = skill.title
    const rate = skill.rate

    if(!skill) {
      return res.status(401).send()
    }

    skill.title = req.body.title
    skill.rate = req.body.rate
    await skill.save()

    await Activities.create({
      action: req.user.name+ " updated a skill",
      description: `Your updated a skill name from ${title} to ${skill.title} and its rate from ${rate} to ${skill.rate} `,
      UserId: req.user.id
    })

    res.status(201).json({skill: skill})
  } catch (e) {
    console.log(e)
    res.status(500).json({error: 'Failed to update skill'})
  }
})

module.exports = router
