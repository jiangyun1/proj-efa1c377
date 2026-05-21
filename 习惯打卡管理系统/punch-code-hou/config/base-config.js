'use strict';

/** 基础配置 */
module.exports = {
  session: {
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, //cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以overwrite (默认default true)
    httpOnly: true, //cookie是否只有服务端可以访问 httpOnly or not (default true)
    signed: true, //签名默认为true
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间(默认：false)
    renew: false, //(boolean) renew session when session is nearly expired
  },
  //cors配置信息,解决前后端的跨域问题
  //添加访问的白名单
  cors: {
    origin: function (ctx) {
      const whiteList = ['http://localhost:8080'];
      // console.log("host:" + ctx.request.url)
      // console.log("referer:" + ctx.header.referer)
      let url = ctx.request.url;
      if (ctx.header.referer) {
        url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
      }
      if (whiteList.includes(url)) {
        // console.log("判断正确")
        return url;
      }
    },
    maxAge: 5,
    credential: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //允许的方法
    allowHeader: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeader: ['WWW-Authenticate', 'Server-Authorization']
  },
  jwt: {
    secretKey: 'myAppToken', //数字签名的密码，只能保留在后端
    tokenExpiresTime: 1000 * 60 * 60 * 8 //过期时间，以毫秒为计算单位，1000*60是一分钟
  }
}