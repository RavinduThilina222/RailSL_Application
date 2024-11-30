module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);
  router.get("/", user.findAll);

  // Add login route
  router.post("/login", user.login);

  // Add route to handle fetching user details
  router.post("/details", user.findDetails);

  app.use('/api/user', router);
};