const managerDao = require('../dao/managerDao') //根据mvc架构，将userDao查操作结果交给service
const encryption = require('../lib/encryption');
const { user } = require('../model/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  // 新增活动
  createActivity: async (activity_name, detail, limit) => {
    let activity = await managerDao.createActivity(activity_name, detail, limit)
    if(activity) {
      return true
    } else {
      return false
    }
  },
  // 查询所有活动
  getAllActivity: async() => {
    let activity = await managerDao.getAllActivity()
    if (activity) {
      return {
        data: activity
      }
    } else {
      return false
    }
  },
  // 查询申请当前活动的用户
  getActivityUser: async(id) => {
    let activity = await managerDao.getActivityUser(id)
    if (activity) {
      return {
        data: activity
      }
    } else {
      return false
    }
  },
  // 查看当前活动参与人名单
  getActivityUserReady: async(id) => {
    let activity = await managerDao.getActivityUserReady(id)
    if (activity) {
      return {
        data: activity
      }
    } else {
      return false
    }
  },
  // 删除活动用户
  deleteActivityUser: async (id) => {
    let activity = await managerDao.deleteActivityUser(id)
    if (activity) {
      return true
    } else {
      return false
    }
  },
  // 同意用户
  agreeActivityUser: async(id) => {
    let activity = await managerDao.agreeActivityUser(id)
    if (activity) {
      return true
    } else {
      return false
    }
  },
  // 删除活动
  deleteActivity: async(id) => {
    let activity = await managerDao.deleteActivity(id)
    if (activity) {
      return true
    } else {
      return false
    }
  }
}