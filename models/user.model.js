module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      User_ID: {
        type: Sequelize.STRING(6),
        primaryKey: true
      },
      Full_Name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(30)
      },
      phone_number: {
        type: Sequelize.STRING(13)
      },
      username: {
        type: Sequelize.STRING(20)
      },
      password: {
        type: Sequelize.STRING(15)
      },
      NIC: {
        type: Sequelize.STRING(12)
      }
    });
  
    return User;
  };