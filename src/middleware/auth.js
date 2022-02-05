const jwt=require('jsonwebtoken')
const users = require('../models/users')
const user=require('../models/users')

const auth=async (req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer ','')
    const check=jwt.verify(token,'newtoken')
    const user=await users.findById(check._id)
    req.user=user
    next()
    }
    catch(e){
        res.status(401).send({error:'user unauthorized'})
    }
}

module.exports=auth