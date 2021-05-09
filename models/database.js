const Sequelize = require('sequelize')
const pg = require('pg')
pg.defaults.ssl = process.env.NODE_ENV === 'production'? {rejectUnauthorized: false} : false
const bcrypt = require('bcrypt')


const database = new Sequelize(process.env.DATABASE_URL)


const users = require('./users')(database, Sequelize)


module.exports.initialize = async () => {
    try {
        await database.sync()
    } catch (error) {
        
    }
}


module.exports.add_user = async (user) => {
    try {
        await users.create(user)
    } catch (error) {
        
    }
}


module.exports.verify = async (credintials) => {
    try {
        const user = await users.findOne({ where: {email: credintials.email}})
        const verified = await bcrypt.compare(credintials.password, user.password)
        return verified? user : false
    } catch (error) {
        
    }
}


module.exports.deposit = async (user_id, amount) => {
    try {
        if (amount > 1) {
            await users.update({
                balance: balance + amount
            }, {
                where: {
                    id: user_id
                }
            })
        }
    } catch (error) {
        
    }
}