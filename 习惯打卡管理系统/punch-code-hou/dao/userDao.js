const allSqlAction = require('../lib/mysql')
const {getNowTime} = require('../lib/getDate')
const { user, activity, relation, other_activity } = require('../model/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
    // 用户注册
    createUser: async (data) => {
        try {
            const { password, phone, salt, roleId } = data;
            let User = await user.create({
                password, phone, salt, roleId
            });
            return User;
        } catch (error) {
            console.log("新增用户出错：" + error);
            return null;
        }
    },
    //通过手机号码查找用户
    getUserByPhone: async (phone) => {  //添加sequelize方法
        return await user.findOne({
            where: {
                phone
            }
        })
    },
    // 新增习惯
    saveEvent: async(phone, text) => {
        try {
            // let time = getNowTime()
            let finish_times = 0
            console.log(finish_times);
            let User = await activity.create({
                phone, text, finish_times
            });
            return User;
        } catch (error) {
            console.log("新增用户出错：" + error);
            return null;
        }
    },
    // 查询习惯
    getEvent: async(phone) => {
        return activity.findAll({
            where: {
                phone
            }
        })
    },
    // 完成次数增加1
    addEventTimes: async(id) => {
        try {
            let activityResult = await activity.findOne({
                where: {
                    id
                }
            });
            let result = await activity.update(
                {
                    finish_times: activityResult.finish_times + 1
                },
                {
                    where: { id }
                }
            );
            return result;
        } catch (error) {
            console.log("新增次数失败" + error)
            return null;
        }
    },
    // 搜索事件
    searchEvent: async(text) => {
        if(text) {
            let event = await activity.findAll({
                where: {
                    text: {
                        [Op.like]: `%${text}%`
                    }
                }
            })
            console.log(event);
            if (event) {
                return event
            } else {
                return null;
            }
        } else {
            return null
        }
    },
    // 申请事件
    toActivity: async (activityId, userId) => {
        try {
            let result = await relation.create(
                {
                    activityId,
                    userId,
                    agree: 0
                }
            );
            return true;
        } catch (error) {
            console.log("新增次数失败" + error)
            return null;
        }
    },
    // 用户未参加的活动
    getNoReadyActivity: async (userId) => {
        try {
            let result = await other_activity.findAll({
                include: [
                    {
                        model: user,
                        through: {
                            where: {
                                userId: {
                                    [Op.ne]: [userId]
                                },
                            }
                        },
                    },
                ],
            })
            return result;
        } catch (error) {
            console.log("查询出错：" + error);
            return null;
        }
    },
    // 我参加的打卡活动
    getMyActivity: async(userId) => {
        try {
            let result = await user.findAll({
                include: [
                    {
                        model: other_activity,
                        through: {
                            where: {
                                agree: 0
                            }
                        }
                    },
                ],
                where: {
                    id: userId,
                },
            })
            return result;
        } catch (error) {
            console.log("查询出错：" + error);
            return null;
        }
    },
    // 编辑事件
    editEvent: async (eventInfo) => {
        try {
            let result = await activity.update(
                {
                    text: eventInfo.text,
                },
                {
                    where: { id: eventInfo.id }
                }
            );
            return result;
        } catch (error) {
            console.log("编辑出错：" + error)
            return null;
        }
    },
    // 删除事件
    deleteEvent: async(id) => {
        try {
            let result = await activity.destroy(
                {
                    where: { id }
                }
            );
            return result;
        } catch (error) {
            console.log("删除出错：" + error)
            return null;
        }
    },
    findUserByPhone:async(phone)=>{
        let sql = `select * from user1 where phone = ${phone}`;
        return allSqlAction.allSqlAction(sql).then(res=>{
            if(res.length>=1){
                return{
                    userid:res[0].id,
                    username:res[0].username,
                    password:res[0].password,
                    phone:res[0].phone
                }
            }else{
                return null;
            }
        })
    },
    findUserById:async(id)=>{
        return await user.findOne({
            where:{
                id:id
            }
        })
    },
    getUsersBySearchInfo:async(query)=>{
        try{
            let result;
            if (JSON.stringify(query) !== "{}") {
                result = await user.findAll({
                    where: {
                        [Op.or]: [
                            {
                                username: query.username ? query.username : null
                            },
                            {
                                phone: query.phone ? query.phone : null
                            },
                            {
                                roleId: query.roleid ? query.roleid : null
                            }
                        ]
                    },
                    include:[{
                        model: role,
                        required: false
                    }]
                });
            } else {
                result = await user.findAll({
                    include:[{
                        model: role
                    }]
                });
            }
            console.log(result)
            return result;

        }catch(error){
            console.log("根据条件查询用户出错："+error);
            return null;
        }
    },
    getAllRoles:async()=>{
        try{
            let result = await role.findAll({});
            return result;
        }catch(error){
            console.log("获取全部角色错误："+error);
            return null;
        }
    },
    deleteUser:async(userid)=>{
        try{
            user.destroy({
                where:{
                    id:userid
                }
            })
        }catch(error){
            console.log('删除用户成功：'+error)
            return null;
        }
    },
    updateUser:async(id,username,phone,roleid)=>{
        try{
            let Role = await role.findOne({
                where: {
                    id: roleid
                }
            });
            let User = await user.findOne({
                where: {
                    id: id
                }
            });
            User.setRole(Role);
            
            let result = await user.update(
                {
                    username:username,
                    phone:phone
                },
                { 
                    where: { id: id }
                }
            );
            return result;
        }catch(error){
                console.log("修改用户出错：" + error)
                return null;
            }
    },
    getAllUser: async() => {
        let result = await user.findAll({
            include:[{
                model: role
            }]
        });
        return result;
    },
    updateUserPass:async(id,password,salt) => {
        try{
            let result = await user.update(
                {
                    password:password,
                    salt:salt
                },
                { 
                    where: { id: id }
                }
            );
            return result;
        }catch(error){
            console.log("修改用户密码出错：" + error)
            return null;
        }
    },
}