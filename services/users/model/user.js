const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: {type: String, unique: true},
    password: String,
    birthdate: Date,
    address: String
  },{writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }})

module.exports = mongoose.model('User', userSchema,'users')