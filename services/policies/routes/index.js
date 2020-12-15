var route = require("express").Router()
var policyRoute = require('./policy-route')

route.use('/',policyRoute)

module.exports = route

