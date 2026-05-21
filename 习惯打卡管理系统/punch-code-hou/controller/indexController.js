const userDao = require('../dao/userDao');
const passport = require('../middleware/passport');
const indexService = require('../service/indexService');
const encryption = require('../lib/encryption');

module.exports = {
    // 保存用户密码
    saveUser: async (ctx, next) => {
        let addResult = await indexService.saveUser(ctx.request.body);
        ctx.session.addinfo = addResult.info;
        if(addResult) {
            ctx.body = {
                success: true,
                data: addResult
            }
        } else {
            ctx.body = {
                success: false,
                data: '注册失败！'
            }
        }
    },
    // token登录
    loginGetToken: async (ctx, next) => {
        //输入的电话 密码赋值
        const phone = ctx.request.body.phone;
        const password = ctx.request.body.password;
        const roleId = ctx.request.body.roleId;
        if (phone && password) {
            let user = await indexService.checkLogin(phone, password, roleId)
            if (user) {
                //在复载中放入userid
                let payload = { userid: user.id };
                let token = encryption.getUserToken(payload);//获取token
                if (token) {
                    ctx.body = {
                        success: true,
                        message: { code: 1, msg: '获取认证成功！' },
                        data: {
                            token: 'Bearer ' + token,
                            roleId: user.roleId,
                            username: user.phone
                        }
                    };
                } else {
                    ctx.body = { success: false, err: { code: 0, msg: '获取认证失败！' } };
                }
            } else {
                ctx.body = { success: false, err: { code: 0, msg: '账号密码错误！' } };
            }
        } else {
            ctx.body = { success: false, err: { code: 0, msg: '账号密码提交失败！' } };
        }
    },
    // 根据ID获取用户
    getUserInfoById: async (ctx, next) => {
        try {
            // console.log(ctx.params);
            const userId = ctx.params.id;
            console.log(userId);
            if (userId) {
                const result = await indexService.getUserById(userId);
                if (result) {
                    ctx.body = {
                        success: true,
                        err: { code: 1, msg: '获取用户信息成功!' },
                        data: result
                    };
                }
            } else {
                ctx.body = {
                    success: false,
                    err: { code: 0, msg: '获取用户信息错误，获取失败!' }
                };
            }
        } catch (e) {
            ctx.body = {
                success: false,
                err: { code: 0, msg: '获取用户信息失败!' }
            };
        }
    },
    index:async(ctx,next)=>{
        await ctx.render('index', {
            title: 'Hello Koa MVC!'
        })
    },
    login:async(ctx,next)=>{
        await ctx.render('login', {})
    },
    checkLogin:async(ctx,next)=>{
        return passport.authenticate('local',async(err,user,info)=>{
            if(err){
                ctx.session.errorMsg = "passport 本地验证策略错误";
                ctx.response.redirect('/error');
            }
            if(!user){
                ctx.session.logInfo = "账号密码错误";
                ctx.response.redirect('/login');
            }else{
                ctx.login(user)
                ctx.response.redirect('/home');
            }
        })(ctx)
    },
    logout:async(ctx,next)=>{
        ctx.logout();
        ctx.response.redirect('/');
    },
    home:async(ctx,next)=>{
        await ctx.render('homeIndex',{
            user:ctx.state.user
        });
    },
    addUser:async(ctx,next)=>{
        let roles = await userDao.getAllRoles();
        await ctx.render('addUser',{
            roles:roles,
            addinfo:ctx.session.addinfo
        })
    },
    openUpdateUser:async(ctx,next)=>{
        let user = await userDao.findUserByPk(ctx.request.query.id);
        console.log(user.name)
        let roles = await userDao.getAllRoles();
        await ctx.render('updateUser',{
            roles:roles,
            updateuser:user,
            info:''
        })
    },
    updateUser:async(ctx,next)=>{
        let updateResult = await indexService.updateUser(ctx.request.body);
        let roles = await userDao.getAllRoles();
        updateResult.roles = roles;
        await ctx.render('updateUser',updateResult)
    },
}