const userDao = require('../dao/userDao');
const passport = require('../middleware/passport');
const indexService = require('../service/indexService');
const encryption = require('../lib/encryption');
const userService = require('../service/userService');

module.exports = {
  // 新增习惯
  saveEvent: async(ctx, next)=> {
    if(ctx.request.body) {
      let addResult = await userService.saveEvent(ctx.request.body.phone, ctx.request.body.text);
      if (addResult) {
        ctx.body = {
          success: true,
          data: '新增成功！'
        }
      } else {
        ctx.body = {
          success: false,
          data: '新增失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 获取用户习惯
  getEvent: async(ctx, next) => {
    if (ctx.query) {
      let addResult = await userService.getEvent(ctx.query.phone);
      if (addResult) {
        ctx.body = {
          success: true,
          data: addResult
        }
      } else {
        ctx.body = {
          success: false,
          data: '新增失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 新增用户完成次数
  addEventTimes: async(ctx, next) => {
    if(ctx.request.body) {
      let addResult = await userService.addEventTimes(ctx.request.body.id);
      if (addResult) {
        ctx.body = {
          success: true,
          message: '次数增加成功'
        }
      } else {
        ctx.body = {
          success: false,
          data: '次数增加失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 搜索习惯
  searchEvent: async(ctx, next) => {
    if (ctx.request.body) {
      let result = await userService.searchEvent(ctx.request.body.text);
      if (result) {
        ctx.body = result
      } else {
        ctx.body = {
          success: false,
          data: '搜索失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 用户申请
  toActivity: async(ctx, next) => {
    if (ctx.request.body) {
      let result = await userService.toActivity(ctx.request.body.id, ctx.request.body.userId);
      if (result) {
        ctx.body = result
      } else {
        ctx.body = {
          success: false,
          data: '申请失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 查询用户未参加的活动
  getNoReadyActivity: async (ctx, next) => {
    if (ctx.query) {
      let result = await userService.getNoReadyActivity(ctx.query.userId);
      if (result) {
        ctx.body = result
      } else {
        ctx.body = {
          success: false,
          data: '申请失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 我参加的打卡活动
  getMyActivity: async (ctx, next) => {
    if (ctx.request.body) {
      let result = await userService.getMyActivity(ctx.request.body.userId);
      if (result) {
        ctx.body = result
      } else {
        ctx.body = {
          success: false,
          data: '申请失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 修改事件
  editEvent: async(ctx, next) => {
    if (ctx.request.body) {
      let editResult = await userService.editEvent(ctx.request.body);
      if (editResult) {
        ctx.body = {
          success: true,
          data: '修改成功！'
        }
      } else {
        ctx.body = {
          success: false,
          data: '修改失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  },
  // 删除事件
  deleteEvent: async(ctx, next) => {
    if (ctx.request.body) {
      let deleteResult = await userService.deleteEvent(ctx.request.body.id);
      if (deleteResult) {
        ctx.body = {
          success: true,
          data: '删除成功！'
        }
      } else {
        ctx.body = {
          success: false,
          data: '删除失败！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        data: '请检查参数，失败！'
      }
    }
  }
}