const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const db = require('./db/mysql')
const User = require('./models/user')

const viewsDirectory = path.join(__dirname, '../templates/views')
const publicDirectory = path.join(__dirname, '../public')

const app = express()
app.set('view engine', 'ejs')
app.set('views', viewsDirectory)
app.use(express.static(publicDirectory))

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(port , () => {
    console.log(`Server is up on ${port}`)
})