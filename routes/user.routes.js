module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);
  router.get("/", user.findAll);

  // Add login route
  router.post("/login", user.login);

  app.use('/api/user', router);
};