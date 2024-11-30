module.exports = app => {
    const schedule = require("../controllers/schedule.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", schedule.create);
  
    // Add more routes as needed
  
    app.use('/api/schedule', router);
  };