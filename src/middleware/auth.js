const jwt=require('jsonwebtoken')
const users = require('../models/users')

const auth=async (req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer ','')
    const check=jwt.verify(token,'newtoken')
    const user=await users.findOne({_id:check._id,'tokens.token':token})
    if(!user)
        throw new Error()
    
    req.token=token
    req.user=user
    next()
    }
    catch(e){
        res.status(401).send({error:'user unauthorized'})
    }
}

module.exports=auth