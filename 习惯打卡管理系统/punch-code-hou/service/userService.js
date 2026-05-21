const userDao = require('../dao/userDao') //根据mvc架构，将userDao查操作结果交给service
const encryption = require('../lib/encryption');
const { user } = require('../model/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  saveEvent: async(phone, text)=> {
    let saveEventResult = await userDao.saveEvent(phone, text)
    if(saveEventResult) {
      return {
        success: true,
        message: '新增成功'
      }
    } else {
      return {
        success: false,
        message: '新增失败'
      }
    }
  },
  getEvent: async(phone) => {
    let getEventResult = await userDao.getEvent(phone)
    if (getEventResult) {
      return {
        success: true,
        message: getEventResult
      }
    } else {
      return false
    }
  },
  // 增加次数
  addEventTimes: async (id) => {
    let getEventResult = await userDao.addEventTimes(id)
    if (getEventResult) {
      return {
        success: true,
        message: '新增成功'
      }
    } else {
      return false
    }
  },
  // 搜索事件
  searchEvent: async(text) => {
    let event = await userDao.searchEvent(text)
    if (event) {
      return {
        success: true,
        data: event
      }
    } else {
      return false
    }
  },
  // 用户申请
  toActivity: async (activityId, userId) => {
    let result = await userDao.toActivity(activityId, userId);
    if (result) {
      return {
        success: true,
        message: '申请成功！'
      }
    } else {
      return false
    }
  },
  // 查询用户未参加的活动
  getNoReadyActivity: async(userId) => {
    let result = await userDao.getNoReadyActivity(userId);
    if (result) {
      return {
        success: true,
        data: result
      }
    } else {
      return false
    }
  },
  // 我参加的打卡活动
  getMyActivity: async (userId) => {
    let result = await userDao.getMyActivity(userId);
    if (result) {
      return {
        success: true,
        data: result
      }
    } else {
      return false
    }
  },
  // 编辑事件
  editEvent: async(eventInfo) => {
    let result = await userDao.editEvent(eventInfo)
    if( result ) {
      return result
    } else {
      return false
    }
  },
  // 删除事件
  deleteEvent: async(id) => {
    let result = await userDao.deleteEvent(id)
    if (result) {
      return result
    } else {
      return false
    }
  }
}