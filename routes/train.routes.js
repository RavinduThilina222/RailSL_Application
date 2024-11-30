const express = require('express');
const router = express.Router();
const train = require("../controllers/train.controller.js");

router.post("/trains", train.addTrain);
// Add other train-related routes as needed

module.exports = router