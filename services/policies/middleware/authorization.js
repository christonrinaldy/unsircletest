const Policy = require('../model/policy')
function authorization(req,res,next){
    Policy.findById(req.params.policyId)
    .then(data=>{
        console.log('authorization success')
        if(data.userId===req.body.user_id){
            next()
        }
        else{
            console.log('authorization failed')
            return res.status(500).json({msg:`you are not authorized to this data`})
        }
    })
    .catch(err=>{
        console.log('authorization error:',err)
        res.status(404).json({msg:`Couldn't find your data`})
    })
    
    
}
module.exports=authorization