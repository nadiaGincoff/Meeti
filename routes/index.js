const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");

module.exports = function () {
  router.get("/", homeController.home);

  // Create and confirm account
  router.get("/create-account", usersController.formCreateAccount);
  router.post("/create-account", usersController.createAccount);
  router.get("/confirm-account/:mail", usersController.confirmAccount);

  // Sign in
  router.get('/sign-in', usersController.formSignIn);
  return router;
};
