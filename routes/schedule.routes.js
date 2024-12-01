const express = require('express');
const router = express.Router();
const schedule = require("../controllers/schedule.controller.js");

router.post("/schedules", schedule.create);
router.get("/schedules", schedule.findAll);

// ...existing code...

module.exports = router; // Export the router