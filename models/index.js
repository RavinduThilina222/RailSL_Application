const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,
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

db.booking.belongsTo(db.user, { foreignKey: 'user_id' });
db.booking.belongsTo(db.schedule, { foreignKey: 'schedule_id' });
db.schedule.belongsTo(db.train, { foreignKey: 'train_no' });
db.seatReservation.belongsTo(db.booking, { foreignKey: 'booking_id' });

module.exports = db;