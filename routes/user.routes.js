module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", user.create);
  
    // Add more routes as needed
  
    app.use('/api/user', router);
  };