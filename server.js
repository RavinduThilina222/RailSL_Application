const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to train booking application." });
});

// User login route
app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;
    // Handle user login logic here
    res.json({ message: 'User login successful' });
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Handle admin login logic here
    res.json({ message: 'Admin login successful' });
});

//View all trains
app.get('/api/train', (req, res) => {
  // Handle get all trains logic here
  
  res.json({ message: 'Get all trains' });
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