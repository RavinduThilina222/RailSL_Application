module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    schedule_id: {
      type: Sequelize.STRING(5),
      primaryKey: true
    },
    train_no: {
      type: Sequelize.STRING(6)
    },
    scheduled_date: {
      type: Sequelize.DATE
    },
    no_of_booked_seats: {
      type: Sequelize.INTEGER
    }
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Train, {
      foreignKey: 'train_no',
      targetKey: 'train_no'
    });
  };

  return Schedule;
};

