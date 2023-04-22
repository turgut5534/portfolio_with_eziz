const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Service = require('../models/services')
const Activities = require('../models/activities')

router.get('/all', auth, async (req, res) => {

  try {
    const services = await Service.findAll()

    res.render('admin/views/service/services', { services })
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/add', auth, (req, res) => {

    res.render('admin/views/service/add-service')

  })

router.get('/edit/:id', auth, async(req, res) => {

    try {

        const service = await Service.findByPk(req.params.id)
        res.render('admin/views/service/edit-service', {service})

    } catch(e) {
        console.log(e)
    }

})

router.post('/save', auth, async (req, res) => {

  const service = new Service(req.body)
  service.UserId = req.user.id

  try {

    await service.save()

    await Activities.create({
      action: req.user.name+ " added a new service",
      description: `Your new is service title is: ${service.title}  `,
      UserId: req.user.id
    })

    res.redirect('/admin/service/all')
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

// Route to delete a skill
router.delete('/delete/:id', auth, async (req, res) => {

  try {
    const service = await Service.findByPk(req.params.id)

    if (!service) {
      return res.status(404).send()
    }

    await Activities.create({
      action: req.user.name+ " deleted a service",
      description: `Your deleted service title is: ${service.title} `,
      UserId: req.user.id
    })

    await service.destroy()

    res.status(200).send()
    
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

router.post('/update', auth, async (req, res) => {

  try {
    const service = await Service.findByPk(req.body.id)
    title = service.title

    if(!service) {
        return res.status(401).send()
      }

    service.title = req.body.title
    service.description = req.body.description

    await service.save()

    await Activities.create({
      action: req.user.name+ " updated a service",
      description: `Your updated a service title from ${title} to ${service.title} `,
      UserId: req.user.id
    })

    res.redirect('/admin/service/all')
  } catch (e) {
    console.log(e)
    res.status(500).json({error: 'Failed to update skill'})
  }
})

module.exports = router
