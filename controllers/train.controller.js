const db = require("../models");
const Train = db.train;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const train = {
    train_no: req.body.train_no,
    train_name: req.body.train_name,
    Train_Line: req.body.Train_Line,
    departure_station: req.body.departure_station,
    arrival_station: req.body.arrival_station,
    available_days: req.body.available_days,
    capacity: req.body.capacity,
    depature_time: req.body.depature_time,
    arrival_time: req.body.arrival_time
  };

  Train.create(train)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Train."
      });
    });
};

// Add more methods as needed