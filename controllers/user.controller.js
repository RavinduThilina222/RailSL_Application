const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    User_ID: req.body.User_ID,
    Full_Name: req.body.Full_Name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    username: req.body.username,
    password: req.body.password,
    NIC: req.body.NIC
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Add login method
exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username, password } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      res.send({ message: "User login successful", user });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while logging in the User."
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};