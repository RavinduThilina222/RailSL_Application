module.exports = app => {
    const train = require("../controllers/train.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", train.create);
    router.post("/details", train.findDetails);
  
    // Add more routes as needed
  
    app.use('/api/train', router);
  };