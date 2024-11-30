const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
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