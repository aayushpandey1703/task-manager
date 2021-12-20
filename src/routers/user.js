const express=require('express')
const { model } = require('mongoose')
const users=require('../models/users')

const Route=new express.Router()


Route.post('/users',async (req,res)=>{
    const first=new users(req.body)       
    
    // same response using async-await
    try{
        await first.save()
        res.send(first)
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

Route.get('/users',async (req,res)=>{

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
        const user=await users.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        if(!user)
            return res.status(404).send({error:'No user with id found'})
        res.status(200).send(user)
        
    }catch(e){
        res.send(400).send(e)

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