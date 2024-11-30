const db = require('../models');
const Booking = db.booking;
const SeatReservation = db.seat_reservation;

exports.createBooking = async (req, res) => {
  try {
    const { user_id, schedule_id, booking_date, status, seats, total_fee } = req.body;

    // Validate input data
    if (!user_id || !schedule_id || !booking_date || !status || !seats || !total_fee) {
      return res.status(400).send({
        message: 'All fields are required.'
      });
    }

    const booking = await Booking.create({
      user_id,
      schedule_id,
      booking_date,
      status,
      seats,
      total_fee
    });

    for (let i = 0; i < seats; i++) {
      await SeatReservation.create({
        booking_id: booking.booking_id,
        seat_no: `S${i + 1}`
      });
    }

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the booking.'
    });
  }
};

// Add more methods as needed