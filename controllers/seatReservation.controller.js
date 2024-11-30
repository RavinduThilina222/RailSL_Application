const db = require("../models");
const SeatReservation = db.seatReservation;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const seatReservation = {
    booking_id: req.body.booking_id,
    seat_no: req.body.seat_no
  };

  SeatReservation.create(seatReservation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Seat Reservation."
      });
    });
};

// Add more methods as needed