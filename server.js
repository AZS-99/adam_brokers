require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const { urlencoded } = require('body-parser')
const main = require('./controllers/main')
const user = require('./controllers/user')
const db = require('./models/database')


app = express()

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.use(urlencoded({extended: true}))

app.use('/', main)
app.use('/user', user)


;(async () => {
    try {
        await db.initialize()
        app.listen(process.env.PORT)
    } catch (error) {
        
    }
}) ()