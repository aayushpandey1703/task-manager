const express=require('express')
const users=require('../models/users')  
const auth=require('../middleware/auth')
const Route=new express.Router()


Route.post('/users',async (req,res)=>{
    const first=new users(req.body)  
    
    // same response using async-await
    try{
        await first.save()
        const token=await first.generateAuthToken()
        res.send({user:first,token:token})
    }
    catch(e){
        res.status(400).send(e)
    }

    // response using promise chaining

    // first.save().then((result)=>{
    //     res.status(201).send(result)
    // }).catch((error)=>{                                             // handle error in inserting data to server
    // res.status(400).send(error)                                     // to get list of http status code visit https://httpstatuses.com/
    // })

})

Route.post('/user/login',async (req,res)=>{
    try{
    const user=await users.findByCredentials(req.body.email,req.body.password)
    const token =await user.generateAuthToken()

    res.send({user:user,token:token})
    }
    catch(e)
        {
            console.log(e)
            res.status(500).send(e)
        }
        
})

Route.get('/users',auth,async (req,res)=>{

    try{
        const user=await users.find()
        const count=await users.countDocuments()
        res.send({user:user,docs:count})
    }
    catch(e){
        res.status(500).send(e)
    }

    // users.find({}).then((result)=>{
    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

Route.get('/users/:id',async (req,res)=>{
    const id=req.params.id

    try{
        
        const user=await users.findById(id)
        res.send(user)

    }
    catch(e){
        res.status(500).send(e)
    }

    // users.findById(id).then((result)=>{
    //     if(result==undefined)
    //         return res.status(404).send('not found')
    //     res.status(302).send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })

})
Route.patch("/user/:id",async (req,res)=>{
    // validate update keys from client
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    var check=true
    updates.forEach((ele)=>{
        if(!allowedUpdates.includes(ele))
            check = false
    }) 
    if(!check)
        return res.send({error:'invalid update request'})
    
    // if valid updates then proceed with update process
    try{
        const user=await users.findById(req.params.id)
        if(!user)
            return res.status(404).send({error:'No user with id found'})

        updates.forEach((ele)=>{
            user[ele]=req.body[ele]
        })
        await user.save()

       
        res.status(200).send(user)
        
    }catch(e){
        res.send(500).send(e)

    }
    
})
Route.delete('/users/:id',async (req,res)=>{
    try{
        const user=await users.findByIdAndDelete(req.params.id)
        if(!user)
            return res.status(404).send({error:'user not found'})
        res.send(user)

    }catch(e){
        res.status(400).send(e)

    }
})

module.exports=Route