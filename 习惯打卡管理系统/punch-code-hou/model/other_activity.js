module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'other_activity',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      activity_name: {
        type: DataTypes.STRING
      },
      detail: {
        type: DataTypes.STRING
      },
      time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      limit: {
        type: DataTypes.INTEGER,
      }
    }
  );
}