module.exports = app => {
    const seatReservation = require("../controllers/seatReservation.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", seatReservation.create);
  
    // Add more routes as needed
  
    app.use('/api/seatReservation', router);
  };