const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')
class UserController {
    static login (req,res) {
        const {username, password} = req.body
        User.find({username: username})
            .then( async result => {
                const encrypted = await result[0].password
                const userId = await result[0]._id
                bcrypt.compare(password,encrypted, (err) => {
                    if(err) {
                        res.status(500).json('username/password is wrong')
                        
                    } else {
                        const access_token = jwt.sign({userId: userId },process.env.SECRET)
                        res.status(200).json({access_token})
                    }
                } )
            })
            .catch (err => {
                console.log(err)
                res.status(500).json({message: 'username/password is wrong'})
            })

    }
    static async register (req,res) {
        const {name,username,password,birthdate,address} = await req.body
        try {
            password.length < 5 ? res.status(500).json({message: 'password at least 8 characters'}) :
            bcrypt.hash(password,5, (err, encrypted) => {
                if(err) {
                    console.log(err)
                } else {
                    User.create({_id: new mongoose.Types.ObjectId(), name,username, password: encrypted, birthdate: new Date(birthdate), address})
                    .then((user_data) => {
                        res.status(200).json(user_data)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        res.status(400).json({message: err.message})
                    })
                }  
            })
        }
        catch(err) {
            res.status(500).json({message: err})
        }
    }
// if needed //
    static read (req,res) {
        User.find((err,doc) => {
            if(err) {
                res.status(500).json({message: 'error'})
            } else {
                res.status(200).json({users_data: doc})
            }
        })
    }
    static delete (req,res) {
        const {userId} = req.params
        User.findByIdAndDelete(userId)
        .then (res => {
            res.status(200).json(res)
        })
        .catch (err => {
            res.status(500).json({message: err})
        })
    }
    static update (req,res) {
        const {userId} = req.params
        User.findByIdAndUpdate(userId, req.body)
        .then (async res => {
            res.status(200).json(res)
        })
        .catch (err => {
            res.status(500).json({message: err})
        })
    }
}
module.exports = UserController