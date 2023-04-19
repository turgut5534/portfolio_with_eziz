const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const mainRouter = require('./routers/mainRouter')
const bodyParser = require('body-parser')

const viewsDirectory = path.join(__dirname, '../templates/views')
const publicDirectory = path.join(__dirname, '../public')

const app = express()

app.set('view engine', 'ejs')
app.set('views', viewsDirectory)
app.use(express.static(publicDirectory))
app.use(bodyParser.urlencoded({extended: true}))
app.use(mainRouter)

app.listen(port , () => {
    console.log(`Server is up on ${port}`)
})