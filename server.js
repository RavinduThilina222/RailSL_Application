const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to train booking application." });
});

require("./routes/admin.routes.js")(app);
require("./routes/booking.routes.js")(app);
require("./routes/schedule.routes.js")(app);
require("./routes/seatReservation.routes.js")(app);
require("./routes/train.routes.js")(app);
require("./routes/user.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});