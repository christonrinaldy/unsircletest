var route = require("express").Router()
var userRoute = require('./user-route')

route.use('/',userRoute)

module.exports = route

