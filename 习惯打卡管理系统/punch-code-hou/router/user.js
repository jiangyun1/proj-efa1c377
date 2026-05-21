const Router = require('koa-router')()
const indexController = require('../controller/indexController')
const userController = require('../controller/userController')

Router.prefix('/user')

Router.post('/register', indexController.saveUser)
Router.post('/login', indexController.loginGetToken)
Router.get('/userInfo/:id', indexController.getUserInfoById);

Router.post('/saveEvent', userController.saveEvent);
Router.get('/getEvent', userController.getEvent);
Router.post('/addEventTimes', userController.addEventTimes);
Router.post('/searchEvent', userController.searchEvent);
Router.post('/toActivity', userController.toActivity);
Router.get('/getNoReadyActivity', userController.getNoReadyActivity);
Router.post('/getMyActivity', userController.getMyActivity);
Router.post('/editEvent', userController.editEvent);
Router.post('/deleteEvent', userController.deleteEvent);

module.exports = Router