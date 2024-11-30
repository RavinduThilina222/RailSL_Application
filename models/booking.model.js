module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
      booking_id: {
        type: Sequelize.STRING(6),
        primaryKey: true
      },
      user_id: {
        type: Sequelize.STRING(6)
      },
      schedule_id: {
        type: Sequelize.STRING(6)
      },
      booking_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING(15)
      },
      seats: {
        type: Sequelize.INTEGER
      },
      total_fee: {
        type: Sequelize.FLOAT
      }
    });
  
    return Booking;
  };