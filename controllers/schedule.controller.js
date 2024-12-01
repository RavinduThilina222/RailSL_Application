const db = require("../models");
const Schedule = db.schedule;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const schedule = {
    schedule_id: req.body.schedule_id,
    train_no: req.body.train_no, // Ensure train_no is referenced correctly
    scheduled_date: req.body.scheduled_date,
    no_of_booked_seats: req.body.no_of_booked_seats
  };

  Schedule.create(schedule)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Schedule."
      });
    });
};

exports.findAll = (req, res) => {
  Schedule.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving schedules."
      });
    });
};
// Add more methods as needed