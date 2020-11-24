const express = require("express");
const router = express.Router();

const homeController = require('../controllers/homeController')
const usersController = require('../controllers/usersController')

module.exports = function () {
  router.get("/", homeController.home)

  router.get("/create-account", usersController.formCreateAccount)
  
  return router;
};
