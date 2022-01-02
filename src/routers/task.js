const express=require('express')
const task=require('../models/task')

const Route=new express.Router()


Route.post('/tasks',async (req,res)=>{                      //to test post method endpoint use postman Route
    const firstTask=new task(req.body)

    try{
        await firstTask.save()
        res.send(firstTask)
    }
    catch(e){
        res.status(500).send(e)
    }

    // firstTask.save().then((result)=>{
    //     res.status(201).send(result)                            
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

Route.get('/tasks',async (req,res)=>{

    try{
        const tasks=await task.find(null,null,{sort:['description']})
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }

    // task.find().then((result)=>{
    //     if(result.length==0)
    //         return res.status(404).send('No task created yet')
    //     res.status(302).send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

Route.get('/tasks/:id',async (req,res)=>{
    const id=req.params.id

    try{
        const found=await task.findById(id)
        res.send(found)
    }
    catch(e){
        res.status(404).send(e)
    }

    // task.findById(id).then((result)=>{
    //     if(result==undefined)
    //         return res.status(404).send("No task found")
    //     res.status(302).send(result)
    // }).catch((error)=>{
    //     res.send(error)
    // })

})
Route.patch('/task/:id',async (req,res)=>{
    const update=Object.keys(req.body)
    try{
        const tasks=await task.findById(req.params.id)
        if(!tasks)
            return res.status(404).send({error:'task not found'})
            
        update.forEach((ele)=>{
            tasks[ele]=req.body[ele]
        })
        await tasks.save()
        res.status(200).send(tasks)

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=Route