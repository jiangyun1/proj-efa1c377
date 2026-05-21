module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phone: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      salt: {
        type: DataTypes.STRING
      },
      roleId: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      summary: {
        type: DataTypes.STRING
      }
    }
  );
}