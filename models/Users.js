const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt-nodejs");

const Users = db.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(60),
    img: Sequelize.STRING(60),
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: { msg: "Add valid email" },
        },
        unique: {
            args: true,
            msg: "User register",
        },
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "the password must not be empty",
            },
        },
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    tokenPassword: Sequelize.STRING,
    tokenExpires: Sequelize.DATE,
}, {
    hooks: {
        beforeCreate(user) {
            user.password = Users.prototype.hashPassword(user.password);
        }
    }
});

// Method to compare passwords 
Users.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Users.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null );
}


module.exports = Users;