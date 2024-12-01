
const express = require('express');
const router = express.Router();
const trainController = require('../controllers/train.controller'); // Assuming you have a train controller

// Define your routes here
router.get('/trains', trainController.getAllTrains); // Example route

// ...other routes...

module.exports = router;