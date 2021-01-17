const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const passport = require('./config/passport')
const router = require("./routes");

// Configuracion y Modelos de DB
const db = require("./config/db");

require("./models/Users");
require("./models/Categories");
require("./models/Groups");
db.sync()
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

// Variables de desarrollo
require("dotenv").config({ path: "variables.env" });

// Aplicacion principal
const app = express();

// Body parser para leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validacion con bastantes funciones 
app.use(expressValidator());

// Habilitar EJS como template engine
app.use(expressEjsLayouts);
app.set("view engine", "ejs");

// Ubicacion vistas
app.set("views", path.join(__dirname, "./views"));

// Archivos estaticos
app.use(express.static("public"));

// Habilitar cookie parser
app.use(cookieParser());

// Crear la session
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Init passport
app.use(passport.initialize())
app.use(passport.session())

// Agrega flash messages
app.use(flash());

// Middleware (user logged, flash messages, fecha actual)
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  const date = new Date();
  res.locals.year = date.getFullYear();
  next();
});

// Routing
app.use("/", router());

// Agrega el puerto
app.listen(process.env.PORT, () => {
  console.log("el svr esta ok");
});
