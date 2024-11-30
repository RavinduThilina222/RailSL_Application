module.exports = app => {
    const booking = require("../controllers/booking.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", booking.create);
  
    // Add more routes as needed
  
    app.use('/api/booking', router);
  };