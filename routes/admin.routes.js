const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");

// Define your routes here
router.get("/", adminController.findAll);
router.post("/", adminController.create);
router.post("/login", adminController.login);
// ...other routes...

module.exports = router;