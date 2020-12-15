var route = require("express").Router()
const UserController = require("../controller/user_controller")

route.get('/users', UserController.read)
route.post('/login', UserController.login)
route.post('/register',UserController.register)
route.delete('/user/:userId', UserController.delete)
route.put('/user/:userId', UserController.update)

module.exports = route