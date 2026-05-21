/** 基础配置 */
const { charset } = require("koa/lib/request")

/** 记录数据库连接信息 */
module.exports = {
  mysql: {
    database: 'punch', //数据库名称
    user: 'root', //mysql用户名
    password: 'root', //mysql密码
    PORT: '3306', //mysql端口号
    host: "127.0.0.1" //服务器ip
  },
  /**sequelize配置 */
  sequelize: {
    host: '127.0.0.1',
    dialect: 'mysql',
    // operatorsAliases:false
    dialectOptions: {
      //字符集
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: { //{}里面是连接值
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      //是否冻结表名，最好设置为true，要不sequelize会自动给表名
      //加上复数s造成查询数据失败
      //mongoose也是这样的问题...
      freezeTableName: true,
      //是否为表添加 createdAt 和 updatedAt 字段
      //createdAt 记录表的创建时间
      //updatedAt 记录字段更新时间
      timestamps: false,
      //是否为表添加 deletedAt 字段
      //在日常开发中删除数据记录是一大禁忌
      //因此我们删除数据并不会真正删除，而是为他添加
      //deletedAt字段
      paranoid: false,
      //是否开启op
      operatorsAliases: false
    },
    //时区
    timezone: '+08:00'
  }
}

