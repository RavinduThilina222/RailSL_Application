module.exports = (sequelize, Sequelize) => {
    const SeatReservation = sequelize.define("seat_reservation", {
      booking_id: {
        type: Sequelize.STRING(6)
      },
      seat_no: {
        type: Sequelize.STRING(5)
      }
    });
  
    return SeatReservation;
  };