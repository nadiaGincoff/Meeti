const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path')
const router = require('./routes')

// Conectar a la db 
const db = require('./config/db');
require('./models/Users');
db.sync().then(() => console.log('DB connected')).catch((error) => console.log(error))

require('dotenv').config({ path: 'variables.env' });

const app = express();

// Habilitar EJS como template engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')

// Ubicacion vistas
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos
app.use(express.static('public'))

// Middleware (user logged, flash messages, fecha actual)
app.use((req, res, next) => {
    const date = new Date();
    res.locals.year = date.getFullYear();
    next();
})

// Routing
app.use('/', router());

// Agrega el puerto 
app.listen(process.env.PORT, () => {
    console.log('el svr esta ok')
})