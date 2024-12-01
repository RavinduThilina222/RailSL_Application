module.exports = (sequelize, Sequelize) => {
  const Train = sequelize.define("train", {
    train_no: {
      type: Sequelize.STRING(6),
      primaryKey: true
    }
  });

  Train.associate = (models) => {
    Train.hasMany(models.Schedule, {
      foreignKey: 'train_no',
      sourceKey: 'train_no'
    });
  };

  return Train;
};
