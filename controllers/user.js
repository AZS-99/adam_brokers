const router = require('express').Router()
const db = require('../models/database')

router.get('/register', (req, res) => {
    res.render('register')
})


router.post('/register', async (req, res) => {
    try {
        await db.add_user(req.body)
        res.send('added')
    } catch (error) {
        console.log(error)
    }
})


router.get('/log_in', async (req, res) => {
    try {
        res.render('log_in')
    } catch (error) {
        
    }
})


router.post('/log_in', async (req, res) => {
    try {
        const user = await db.verify(req.body)
        if (user) {
            res.send(user)
        } else 
            res.send('oops')
    } catch (error) {
        
    }
})


module.exports = router