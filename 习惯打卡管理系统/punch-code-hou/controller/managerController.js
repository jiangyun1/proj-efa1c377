const managerService = require('../service/managerService')

module.exports = {
  // 新增活动
  createActivity: async (ctx, next) => {
    if(ctx.request.body) {
      let activity = await managerService.createActivity(ctx.request.body.activity_name, ctx.request.body.detail, ctx.request.body.limit)
      if (activity) {
        ctx.body = {
          success: true,
          message: '新增成功'
        }
      } else {
        ctx.body = {
          success: false,
          message: '新增失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  },
  // 获取全部活动
  getAllActivity: async(ctx, next) => {
      let activity = await managerService.getAllActivity()
      if (activity) {
        ctx.body = activity
      } else {
        ctx.body = {
          success: false,
          message: '查询失败'
        }
      }
  },
  // 查询申请当前活动的用户
  getActivityUser: async (ctx, next) => {
    if (ctx.request.body) {
      let activity = await managerService.getActivityUser(ctx.request.body.id)
      if (activity) {
        ctx.body = activity
      } else {
        ctx.body = {
          success: false,
          message: '查询失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  },
  // 查询申请当前活动的用户
  getActivityUserReady: async (ctx, next) => {
    if (ctx.request.body) {
      let activity = await managerService.getActivityUserReady(ctx.request.body.id)
      if (activity) {
        ctx.body = activity
      } else {
        ctx.body = {
          success: false,
          message: '查询失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  },
  // 删除活动用户
  deleteActivityUser: async (ctx,next) => {
    if (ctx.request.body) {
      let activity = await managerService.deleteActivityUser(ctx.request.body.id)
      if (activity) {
        ctx.body = {
          success: true,
          message: '删除成功'
        }
      } else {
        ctx.body = {
          success: true,
          message: '删除失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  },
  // 同意用户申请
  agreeActivityUser: async (ctx, next) => {
    if (ctx.request.body) {
      let activity = await managerService.agreeActivityUser(ctx.request.body.id)
      if (activity) {
        ctx.body = {
          success: true,
          message: '已同意'
        }
      } else {
        ctx.body = {
          success: true,
          message: '失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  },
  // 删除活动
  deleteActivity: async (ctx, next) => {
    if (ctx.request.body) {
      let activity = await managerService.deleteActivity(ctx.request.body.id)
      if (activity) {
        ctx.body = {
          success: true,
          message: '删除成功'
        }
      } else {
        ctx.body = {
          success: true,
          message: '删除失败'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '请检查参数'
      }
    }
  }
}