const db = require("../models");
const Admin = db.admin;

exports.create = (req, res) => {
  const { admin_id, user_name, password, full_name, email, phone_number } = req.body;

  console.log("Received data:", req.body); // Log received data

  Admin.create({
    admin_id,
    user_name,
    password,
    full_name,
    email,
    phone_number
  })
    .then(data => {
      console.log("Data saved:", data); // Log saved data
      res.status(201).send(data);
    })
    .catch(err => {
      console.error("Error details:", err); // Log detailed error
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin."
      });
    });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", req.body); // Log login attempt

  try {
    Admin.findOne({ where: { user_name: username, password: password } })
      .then(admin => {
        if (!admin) {
          console.log("Invalid login credentials"); // Log invalid credentials
          return res.status(401).send({
            message: "Invalid username or password."
          });
        }
        console.log("Login successful"); // Log successful login
        res.send({ message: "Admin login successful" });
      })
      .catch(err => {
        console.error("Error during login:", err); // Log error details
        res.status(500).send({
          message: err.message || "Some error occurred while logging in."
        });
      });
  } catch (error) {
    console.error("Unexpected error during login:", error); // Log unexpected error
    res.status(500).send({
      message: error.message || "Some error occurred while logging in."
    });
  }
};

exports.findAll = (req, res) => {
  Admin.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins."
      });
    });
};

// Add more methods as needed