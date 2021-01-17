const Sequelize = require('sequelize')
const db = require('../config/db')

const Categories = db.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    }, 
    name: Sequelize.TEXT
})

module.exports = Categories;