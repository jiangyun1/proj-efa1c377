module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'relation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      activityId: {
        type: DataTypes.INTEGER,
      },
      agree: {
        type: DataTypes.INTEGER,
      }
    }
  );
}