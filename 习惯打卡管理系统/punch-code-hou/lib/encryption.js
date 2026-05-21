const md5 = require("md5")
const uuid = require("uuid")
const jsonwebtoken = require('jsonwebtoken')
const baseConfig = require('../config/base-config')

module.exports={
    //生成token（token里面包括附载、数字签名、过期时间）
    getUserToken:(payload)=>{   //payload里面是一个id
        let nowDate = new Date();
        payload.iat = nowDate.getTime();  //设置签发时间
        const token = jsonwebtoken.sign(payload,baseConfig.jwt.secretKey,{expiresIn:baseConfig.jwt.tokenExpiresTime});
                                                                                        //这是在配置里面写的过期时间
        return token;
    },
    //获取uuid
    generateId:()=>{
        return uuid.v4();
    },
    //使用盐值md5加密
    getMd5Pass:async(val,salt)=>{
        let passSalt = md5(md5(val)+salt);
        return passSalt;
    }
}