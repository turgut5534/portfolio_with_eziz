const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const mainRouter = require('./routers/mainRouter')
const adminRouter = require('./routers/adminRouter')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const viewsDirectory = path.join(__dirname, '../templates')
const publicDirectory = path.join(__dirname, '../public')
const uploadsDirectory = path.join(__dirname, '../uploads')

const app = express()

app.set('view engine', 'ejs')
app.set('views', viewsDirectory)
app.use(express.static(publicDirectory))
app.use(express.static(uploadsDirectory))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())

app.use(mainRouter)
app.use('/admin', adminRouter)

app.listen(port , () => {
    console.log(`Server is up on ${port}`)
})