const userDao = require('../dao/userDao') //根据mvc架构，将userDao查操作结果交给service
const encryption = require('../lib/encryption');
const { user } = require('../model/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    // 用户注册
    saveUser: async (userInfo) => {
        if (userInfo.phone) {
            let user = await userDao.getUserByPhone(userInfo.phone);
            if (!user) {
                let salt = encryption.generateId();
                console.log(salt);
                let encryPass = await encryption.getMd5Pass(userInfo.password, salt);
                userInfo.salt = salt;
                userInfo.password = encryPass;
                let result = await userDao.createUser(userInfo);
                if (result) {
                    return { success: 1, info: '新增用户成功' }
                } else {
                    return { success: 0, info: '新增用户失败！' }
                }
            } else {
                return { success: 0, info: '该手机号码已存在！' }
            }
        }
        return { success: 0, info: '信息提交有误！' };
    },
    checkLogin: async (phone, password) => {
        //调用userDao中的sequelize的方法
        let user = await userDao.getUserByPhone(phone);//查询用户信息给user
        if (user) {
            let encryPass = await encryption.getMd5Pass(password, user.salt);
            if (encryPass == user.password) {
                return user;
            }
        }
        return null;
    },
    updateUser: async (userInfo) => {
        if (userInfo.id) {
            let user = await userDao.findUserByPk(userInfo.id);
            let phoneUsers = await userDao.getAllUsersByPhone(user.phone);
            if (phoneUsers.length == 1) {
                let result = await userDao.updateUser(userInfo.id, {
                    username: userInfo.username,
                    phone: userInfo.phone,
                    roleid: userInfo.roleid
                })
                if (result) {
                    return { updateuser: userInfo, success: 1, info: '修改用户成功' }
                } else {
                    return { updateuser: userInfo, success: 0, info: '修改用户失败！' }
                }
            } else {
                return { updateuser: userInfo, success: 0, info: '该手机号码已存在！' }
            }
        } return { updateuser: userInfo, success: 0, info: '信息提交有误！' };
    },
    // 根据id查找用户
    getUserById: async (userId) => {
        try {
            let result = await user.findOne({
                where: {
                    id: userId
                },
                attributes: ['id', 'phone', 'roleId'],//查询用户的基本信息
            })
            return result;
        } catch (error) {
            return null;
        }
    }
}