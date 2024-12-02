const Sequelize = require('sequelize');
const { logger } = require('./logger'); // Import the logger

const sequelize = new Sequelize('railsl_db', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.schedule = require("./schedule.model.js")(sequelize, Sequelize);
db.seatReservation = require("./seatReservation.model.js")(sequelize, Sequelize);
db.train = require("./train.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// Log database connection status
sequelize.authenticate()
  .then(() => {
    logger.info('Database connected and synchronized successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = db;