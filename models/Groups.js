const Sequelize = require('sequelize')
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db')
const Categories = require('./Categories')
const Users = require('./Users')

const Groups = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        allowNull: false, 
        defaultValue: uuidv4()
    },
    name: {
        type: Sequelize.TEXT(100),
        allowNull: false, 
        validate: {
            notEmpty: {
                msg: 'The group must have a name'
            }
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false, 
        validate: {
            notEmpty: {
                msg: 'Put a description'
            }
        }
    },
    url: Sequelize.TEXT,
    image: Sequelize.TEXT,
})

/* Relacionar automaticamente con el ORM 
- cada grupo tiene una categoria
* Relacion uno a uno
*/
Groups.belongsTo(Categories)
Groups.belongsTo(Users)

module.exports = Groups;