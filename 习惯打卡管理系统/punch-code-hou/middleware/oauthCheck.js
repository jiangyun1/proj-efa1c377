const passport = require('../middleware/passport')
module.exports={
    //api请求的token验证策略
    apiJwtCheck:async(ctx,next)=>{
        console.log(ctx.request.header)
        if(ctx.request.header.authorization){//首先检查是否有token，在header里面新增条目，就是验证信息的名字，放进生成的token，通过头部文件把头部文件带过去
            return passport.authenticate('jwt',{session:false},async(err,user,info)=>{ //用passport里面的authenticate验证token
                if(err){
                    ctx.body = {success:false,
                    err:{code:0,msg:info}
                    };
                }
                if(user){
                    await next();
                }else{
                    ctx.body = {success:false,
                    err:{code:0,msg:info}
                    };
                }
            })(ctx,next)
        }else{
            ctx.body = {success:false,err:{code:0,msg:'未授权用户，禁止访问'}}
        }
    },
    sessionCheck:async(ctx,next)=>{
        if(ctx.isAuthenticated()){
            await next();

        }else{
            ctx.session.logInfo = "登陆账号异常，请重新登录";
            ctx.response.redirect('/login');
        }
    }
}