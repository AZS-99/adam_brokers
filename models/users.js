const bcrypt = require('bcrypt')
const SLAT_ROUNDS = 12

module.exports = (database, Sequelize) => {
    return database.define('users', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            len: [8, 30]
        },
        balance: {
            type: Sequelize.DOUBLE,
            defaultValue: 0
        }
    }, {
        hooks: {
            afterValidate: async (user, options) => {
                try {
                    user.password = await bcrypt.hash(user.password, SLAT_ROUNDS)
                } catch (error) {
                    
                }
            }
        }
    })
}