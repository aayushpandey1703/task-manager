const jwt=require('jsonwebtoken')
const user=require('../models/users')
const auth=async (req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer ','')
    const check=jwt.verify(token,'newtoken')
    console.log(check)
    next()
    }
    catch(e){
        res.status(401).send({error:'user unauthorized'})
    }
}

module.exports=auth