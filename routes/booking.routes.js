const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/bookings', bookingController.createBooking);

module.exports = router;