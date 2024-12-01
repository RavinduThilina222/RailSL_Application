const db = require("../models");
const Train = db.train;

// Add more methods as needed

exports.addTrain = (req, res) => {
  console.log('Received train details:', req.body); // Log received data

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
      res.status(201).json(data); // Use 201 status for created resource
    })
    .catch(err => {
      console.error('Error creating train:', err); // Log full error details
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Train.",
        error: err.toString()
      });
    });
};

exports.getTrains = (req, res) => {
  Train.findAll()
    .then((data) => {
      res.json(data); // Send all train records to the client
    })
    .catch((err) => {
      console.error('Error getting trains:', err);
      res.status(500).json({
        message: "Some error occurred while retrieving trains.",
        error: err.toString(),
      });
    });
};


exports.getTrainCount = (req, res) => {
  Train.count()
    .then((data) => {
      res.json(data); // Send the count to the client
    })
    .catch((err) => {
      console.error('Error getting train count:', err);
      res.status(500).json({
        message: "Some error occurred while retrieving train count.",
        error: err.toString(),
      });
    });
};

