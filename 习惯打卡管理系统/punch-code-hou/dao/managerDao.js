const allSqlAction = require('../lib/mysql')
const { getNowTime } = require('../lib/getDate')
const { other_activity,user, relation } = require('../model/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  // 新增活动
  createActivity: async (activity_name, detail, limit) => {
    try {
      console.log(limit);
      let activity = await other_activity.create({
        activity_name, detail, limit
      });
      return true;
    } catch (error) {
      console.log("新增用户出错：" + error);
      return null;
    }
  },
  // 查询所有活动
  getAllActivity: async() => {
    try {
      let activity = await other_activity.findAll({})
      return activity;
    } catch (error) {
      console.log("查询出错：" + error);
      return null;
    }
  },
  // 查询申请当前活动的用户
  getActivityUser: async(id) => {
    try {
      let result = await other_activity.findAll({
        include: [
          {
            model: user,
            through: {
              where: {
                agree: 0
              }
            }
         },
        ],
        where: {
          id,
        },
      })
      return result;
    } catch (error) {
      console.log("查询出错：" + error);
      return null;
    }
  },
  // 查看当前活动参与人名单,
  getActivityUserReady: async (id) => {
    try {
      let result = await other_activity.findAll({
        include: [
          {
            model: user,
            through: {
              where: {
                agree: 1
              }
            }
          },
        ],
        where: {
          id,
        },
      })
      return result;
    } catch (error) {
      console.log("查询出错：" + error);
      return null;
    }
  },
  // 删除活动用户
  deleteActivityUser: async(id) => {
    try {
      let result = await relation.destroy({
        where: {
          id
        }
      })
      return result;
    } catch (error) {
      console.log("删除出错：" + error);
      return null;
    }
  },
  // 同意用户
  agreeActivityUser: async(id) => {
    try {
      console.log(id);
      let result = await relation.update(
        {
          agree: 1
        },
        {
          where: {
            id
          }
        }
      )
      console.log(result);
      return true
    } catch(err) {
      console.log("删除出错：" + error);
      return null;
    }
  },
  // 删除活动
  deleteActivity: async(id) => {
    try {
      let result = await relation.destroy({
        where: {
          activityId: id
        }
      })
      let otherResult = await other_activity.destroy({
        where: {
          id
        }
      })
      return true;
    } catch (error) {
      console.log("删除出错：" + error);
      return null;
    }
  }
}