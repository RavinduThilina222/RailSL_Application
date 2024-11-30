module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", admin.create);
  
    // Add more routes as needed
  
    app.use('/api/admin', router);
  };