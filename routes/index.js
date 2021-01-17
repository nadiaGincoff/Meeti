const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authenticationController");
const adminController = require("../controllers/adminController");
const groupsController = require("../controllers/groupsController");

module.exports = function () {
  router.get("/", homeController.home);

  // Create account
  router.get("/create-account", usersController.formCreateAccount);
  router.post("/create-account", usersController.createAccount);

  // Sign in
  router.get('/sign-in', usersController.formSignIn)
  router.post('/sign-in', authController.authenticateUser)

  // Administration panel
  router.get('/administration', 
    authController.authenticatedUser,
    adminController.administrationPanel
  )
  
  // New groups
  router.get('/new-group',
    authController.authenticatedUser,
    groupsController.formNewGroup,
  )

  router.post('/new-group', 
    groupsController.uploadImage,
    groupsController.createGroup
  )
    
  return router;
};
