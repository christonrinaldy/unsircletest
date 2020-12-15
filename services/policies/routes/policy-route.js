var route = require("express").Router()
var authentication = require('../middleware/authentication')
const PolicyController = require('../controller/policy-controller')
const authorization = require("../middleware/authorization")

route.get('/policies',authentication, PolicyController.read)
route.post('/policies',authentication, PolicyController.add)
route.delete('/policy/:policyId', authentication, authorization, PolicyController.delete)
route.put('/policy/:policyId', authentication,authorization, PolicyController.update)

module.exports = route