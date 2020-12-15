const jwt=require('jsonwebtoken')

async function authentication (req,res,next){
    if(!req.headers.access_token){
        res.status(500).json({msg:"not authenticated"})
    }
    else{
        try{
            const object= await jwt.verify(req.headers.access_token,process.env.JWT_SECRET)
           
            if(!object){
                console.log('authentication failed')
                res.status(401).json('not authenticated user')
            }
            else{
                console.log('authenticated')
                req.body.user_id = object.userId
                next()
            }
        }catch(err){
            console.log('authentication error:',err)
            res.status(401).json({
                msg:'not authenticated'
            })
        }
    }
}
module.exports=authentication