const Router = require('koa-router')()
const managerController = require('../controller/managerController')

Router.prefix('/manager')

Router.post('/createActivity', managerController.createActivity)
Router.get('/getAllActivity', managerController.getAllActivity)
Router.post('/getActivityUser', managerController.getActivityUser)
Router.post('/getActivityUserReady', managerController.getActivityUserReady)
Router.post('/deleteActivityUser', managerController.deleteActivityUser)
Router.post('/agreeActivityUser', managerController.agreeActivityUser)
Router.post('/deleteActivity', managerController.deleteActivity)

module.exports = Router