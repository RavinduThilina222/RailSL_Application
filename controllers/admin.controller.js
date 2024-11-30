const db = require("../models");
const Admin = db.admin;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const admin = {
    admin_id: req.body.admin_id,
    user_name: req.body.user_name,
    password: req.body.password
  };

  Admin.create(admin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin."
      });
    });
};

// Add more methods as needed