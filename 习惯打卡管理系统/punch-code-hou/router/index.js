const Router = require('koa-router')()

Router.get('/', async(ctx)=>{
  ctx.body = 'Hello welcome'
})

Router.get('/user', async (ctx) => {
  ctx.body = {
    message: '活动获取成功',
    activity: {
      id: 1,
      name: '西部计划',
      detail: '西部计划详情啊啊说的按时请问饿按时现在',
      user: '用户1',
      detail: 'aa',
      userid: '1'
    }
  }
})

module.exports = Router