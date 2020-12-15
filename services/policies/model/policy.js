const mongoose = require('mongoose')

const policySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    userId: String
},{writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }})

module.exports = mongoose.model('Policy', policySchema, 'policies')