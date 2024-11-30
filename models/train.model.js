module.exports = (sequelize, Sequelize) => {
    const Train = sequelize.define("train", {
      train_no: {
        type: Sequelize.STRING(6),
        primaryKey: true
      },
      train_name: {
        type: Sequelize.STRING(20)
      },
      Train_Line: {
        type: Sequelize.STRING(20)
      },
      departure_station: {
        type: Sequelize.STRING(20)
      },
      arrival_station: {
        type: Sequelize.STRING(20)
      },
      available_days: {
        type: Sequelize.STRING(10)
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      depature_time: {
        type: Sequelize.STRING(100)
      },
      arrival_time: {
        type: Sequelize.STRING(100)
      }
    });
  
    return Train;
  };