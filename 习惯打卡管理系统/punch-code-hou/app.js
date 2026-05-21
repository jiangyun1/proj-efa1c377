const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const baseConfig = require('./config/base-config')
const index = require('./router/index')
const user = require('./router/user')
const manager = require('./router/manager')
const passport = require('./middleware/passport')
const cors = require('koa2-cors')

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',  //cookie key(default is koa:sess)
  maxAge: 86400000,  //cookie的过期时间 maxAge in ms(default is 1 days)
  overwrite: true,   //是否可以overwrite  (默认default true)
  httpOnly: true,  //cookie是否只有服务端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求强行设置cookie,这将重置cookie过期时间
  renew: false,
}

app.use(cors(baseConfig.cors)); //使用cors中间件
// error handler
onerror(app)
app.use(session(CONFIG, app))
// middlewares

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


//使用passport中间件
app.use(passport.initialize())
app.use(passport.session())

app.use(views(__dirname + '/views', {
  //extension: 'nunjucks'
  map: { html: 'nunjucks' }
}))
// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(manager.routes(), manager.allowedMethods())

app.listen(3000, ()=>{
  console.log('已启动请访问：http://localhost:3000');
})

module.exports = app