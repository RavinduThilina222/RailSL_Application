const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = require("./models");
db.sequelize.sync({ alter: true }) // Use alter to update existing tables
  .then(() => {
    console.log("Database connected and synchronized successfully.");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RailSL Train Booking Application" });
});

// Import Route Modules
const adminRoutes = require('./routes/admin.routes');
const bookingRoutes = require('./routes/booking.routes');
const scheduleRoutes = require('./routes/schedule.routes');
const seatReservationRoutes = require('./routes/seatReservation.routes');
const trainRoutes = require('./routes/train.routes');
const userRoutes = require('./routes/user.routes');

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/seatReservation', seatReservationRoutes);
app.use('/api/train', trainRoutes);
app.use('/api/user', userRoutes);

// Fallback Route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  db.sequelize.close()
    .then(() => {
      console.log('Database connection closed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error closing database connection:', err);
      process.exit(1);
    });
});