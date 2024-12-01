const express = require('express');
const router = express.Router();
const train = require('../controllers/train.controller'); // Adjust the path as necessary

router.post("/trains", train.addTrain);
router.get("/trains", train.getTrains);
router.get("/number", train.getTrainCount);

// Example route for testing
router.get('/example', (req, res) => {
    res.send('Example route');
});

module.exports = router;