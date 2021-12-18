const express=require('express')
require('./db/mongoose')
const users=require('./models/users')
const task=require('./models/task')

const app=express()
const port=process.env.PORT || 3000
app.use(express.json())                                             // parse json client request into object

app.post('/users',async (req,res)=>{
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

app.post('/tasks',async (req,res)=>{                      //to test post method endpoint use postman app
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

app.get('/users',async (req,res)=>{

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

app.get('/users/:id',async (req,res)=>{
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

app.get('/tasks',async (req,res)=>{

    try{
        const tasks=await task.find()
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

app.get('/tasks/:id',async (req,res)=>{
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


app.listen(port,()=>{
    console.log('server listerning on port',port)
})
  