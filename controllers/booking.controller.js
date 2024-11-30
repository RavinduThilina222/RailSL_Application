const db = require("../models");
const Booking = db.booking;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const booking = {
    booking_id: req.body.booking_id,
    user_id: req.body.user_id,
    schedule_id: req.body.schedule_id,
    booking_date: req.body.booking_date,
    status: req.body.status
  };

  Booking.create(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Booking."
      });
    });
};

// Add more methods as needed