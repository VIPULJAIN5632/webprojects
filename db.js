const Sequelize = require('sequelize');

const db = new Sequelize(
    'sql12303737',
    'sql12303737',
    'Ne3gN5vWf5',
    {
        dialect: 'mysql',
        host: 'sql12.freemysqlhosting.net'
    }
)

const Users = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
 
})

db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users
}