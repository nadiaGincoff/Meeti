const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");

module.exports = function () {
  router.get("/", homeController.home);

  // Create account
  router.get("/create-account", usersController.formCreateAccount);
  router.post("/create-account", usersController.createAccount);

  // Sign in
  router.get('/sign-in', usersController.formSignIn)
  return router;
};
