const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

// Create a new user
router.post("/", userController.create);

// Get all users
router.get("/", userController.findAll);

// User login route
router.post("/login", userController.login);



module.exports = router;