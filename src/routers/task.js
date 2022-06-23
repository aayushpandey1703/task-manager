const express=require('express')
const task=require('../models/task')
const users=require('../models/users')
const auth=require('../middleware/auth')

const Route=new express.Router()


Route.post('/tasks',auth,async (req,res)=>{                      //to test post method endpoint use postman Route
    req.body.owner=req.user._id
    const firstTask=new task(req.body)
    
    try{

        await firstTask.save()
        const user=await users.findById(req.user._id)
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

//example of filtering, pagination and sorting
//GET /tasks?limit=2&skip=1 [pagination]
//GET /tasks?completed=true [filtering]
//GET /tasks?sort=created_at

Route.get('/tasks',auth,async (req,res)=>{

    try{
        const match={}
        if(req.query.completed!=undefined)    
            match.status=req.query.completed

        const sort={}
        sort[req.query.sort]=-1
        

        const user=await users.findById(req.user._id)

        await user.populate({
            path:'tasks',
            match:match,                                        // filtering
            options:{                                           // pagination and sorting
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:sort
            }
        })

        res.send(user.tasks)
    }
    catch(e){
        res.status(500).send({error:e})
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
        await found.populate("owner")           // get user detail with blog id primary-foreign key concept
        res.send(found.owner)
    }
    catch(e){
        res.status(500).send(e)
    }

    // task.findById(id).then((result)=>{
    //     if(result==undefined)
    //         return res.status(404).send("No task found")
    //     res.status(302).send(result)
    // }).catch((error)=>{
    //     res.send(error)
    // })

})
Route.patch('/task/:id',auth,async (req,res)=>{
    const update=Object.keys(req.body)
    const id=req.params.id
    try{
        const tasks=await task.findOne({_id:id,owner:req.user._id})
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

Route.delete('/task/delete/:id',auth,async (req,res)=>{
    try{
        const id=req.params.id
        const deleteTask=await task.findOneAndDelete({_id:id,owner:req.user._id})
        res.status(200).send(deleteTask)
    }
    catch(e){
        res.send(500).send({error:e})
    }
})

module.exports=Route