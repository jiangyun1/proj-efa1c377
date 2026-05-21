const { Sequelize } = require('sequelize');
const config = require('../config/db-config')
const { QueryTypes, DataTypes } = require("sequelize");

var sequelizeObj = new Sequelize( //创建sequelize对象
  config.mysql.database, //配置的数据库
  config.mysql.user,
  config.mysql.password,
  config.sequelize
);

const user = require('../model/user')(sequelizeObj, DataTypes)
const activity = require('../model/activity')(sequelizeObj, DataTypes)
const other_activity = require('../model/other_activity')(sequelizeObj, DataTypes)
const relation = require('../model/relation')(sequelizeObj, DataTypes)

user.belongsToMany(other_activity, {
  through: relation,
  foreignKey: 'userId',
  otherKey: 'activityId',
});

other_activity.belongsToMany(user, {
  through: relation,
  foreignKey: 'activityId',
  otherKey: 'userId',
});

module.exports = {
  user,
  activity,
  other_activity,
  relation
}