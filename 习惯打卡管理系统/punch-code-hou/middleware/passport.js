const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
const indexService = require('../service/indexService')
const baseConfig = require('../config/base-config')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = baseConfig.jwt.secretKey;

passport.serializeUser(function (user, done) {
    user.password = '';
    user.salt = '';
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

passport.use(new jwtStrategy(opts,async(jwt_payloads,done)=>{ 
    // jwt验证策略
    // 在jwt中封装的payload,过期时间是否符合预期
    let nowDate = new Date();
    if(nowDate.getTime()<=jwt_payloads.exp){
        const user = await userService.getUserById(jwt_payloads.userid); //再一次查询用户id,增加业务逻辑
        if(user){
            return done(null,user,'token验证成功')
        }else{
            return done(null,false,'token验证失败')
        }
    }else{
        return done(null,false,'token过期')
    }
}))
passport.use(new LocalStrategy({//本地验证策略
    usernameField:"phone",
    passwordField:"password"
},
  async function(phone,password,done){
      let result = await indexService.checkLogin(phone,password);//检验账号、密码是否一致
      if(result){
          return done(null,result,'登陆成功')  //是，则登录成功
      }else{
          return done(null,false,'账号密码错误')  //不是，显示账号密码错误
      }
  },
))

module.exports=passport