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
db.sequelize.sync()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

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
// app.post('/api/admin/login', (req, res) => {
//     const { username, password } = req.body;
//     // Handle admin login logic here
//     res.json({ message: 'Admin login successful' });
// });

//View all trains
app.get('/api/train', (req, res) => {
  // Handle get all trains logic here
  
  res.json({ message: 'Get all trains' });
});

app.post('/api/train/details', (req, res) => {
  const { train_no, scheduled_date } = req.body;
  // Fetch train details based on train_no and scheduled_date
  res.json({ message: 'Train details fetched successfully' });
});

app.post('/api/user/details', (req, res) => {
  const { user_id } = req.body;
  // Fetch user details based on user_id
  res.json({ message: 'User details fetched successfully' });
});

// Define the /api/admins route
// app.post('/api/admins', (req, res) => {
//   const { username, password } = req.body;
//   // Add your logic to handle adding an admin here
//   res.status(201).json({ message: 'Admin added successfully' });
// });

const adminRoutes = require('./routes/admin.routes');
const bookingRoutes = require('./routes/booking.routes');
const scheduleRoutes = require('./routes/schedule.routes');
const seatReservationRoutes = require('./routes/seatReservation.routes');
const trainRoutes = require('./routes/train.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/admin', adminRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/seatReservation', seatReservationRoutes);
app.use('/api/train', trainRoutes);
app.use('/api/user', userRoutes);
// Remove this line to avoid duplicate route handling
// app.use('/api/admins', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});