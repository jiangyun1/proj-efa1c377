module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      finish_times: {
        type: DataTypes.INTEGER
      },
      time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }
  );
}