const mongoose = require("mongoose")
const Policy = require('../model/policy')
class PolicyController {
    static read (req,res) {
        Policy.find({userId: req.body.user_id},(err,doc) => {
            if(err) {
                res.status(500).json({message: 'error'})
            } else {
                res.status(200).json(doc)
            }
        })
    }
    static add (req,res) {
        const {name,user_id} = req.body
        Policy.create({_id: new mongoose.Types.ObjectId(), name, userId:user_id})
        .then((policy) => {
            console.log('success to add data',policy)
            res.status(200).json(policy)
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
    }
    static delete (req,res) {
        const {policyId} = req.params
        Policy.findByIdAndDelete(policyId)
        .then (res => {
            console.log('success to delete data with id:',policyId)
            res.status(200).json({message: `success to delete data with id: ${policyId}`})
        })
        .catch (err => {
            res.status(500).json({message: err})
        })
    }
    static update (req,res) {
        const {policyId} = req.params
        Policy.findByIdAndUpdate(policyId, req.body)
        .then (async res => {
            const data = await Policy.findById(policyId)
            console.log(data)
            await res.status(200).json(data)
        })
        .catch (err => {
            res.status(500).json({message: err})
        })
    }
}
module.exports = PolicyController