module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    admin_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    full_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    }
  });

  return Admin;
};