module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      admin_id: {
        type: Sequelize.STRING(4),
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING(15)
      },
      password: {
        type: Sequelize.STRING(20)
      }
    });
  
    return Admin;
  };