const nodemailer = require('nodemailer')
const emailConfig = require('../config/emails')
const fs = require('fs')
const util = require('util')
const ejs = require('ejs')

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
})

exports.sendEmail = async (options) => {
    console.log(options)
    
    // read file for email
    const file = __dirname + `../views/${options.file}.ejs`

    // compiled
    const compiled = ejs.compile(fs.readFileSync(file, 'utf8'))

    // create HTML
    const html = compiled({ url: options.url })

}