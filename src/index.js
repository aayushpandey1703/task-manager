const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())                                             // parse json client request into object
app.use(userRouter)                                                 // register route with express to use all user endpoints
app.use(taskRouter)



// app.post('/users',async (req,res)=>{
//     const first=new users(req.body)       
    
//     // same response using async-await
//     try{
//         await first.save()
//         res.send(first)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }

//     // response using promise chaining

//     // first.save().then((result)=>{
//     //     res.status(201).send(result)
//     // }).catch((error)=>{                                             // handle error in inserting data to server
//     // res.status(400).send(error)                                     // to get list of http status code visit https://httpstatuses.com/
//     // })

// })

// app.post('/tasks',async (req,res)=>{                      //to test post method endpoint use postman app
//     const firstTask=new task(req.body)

//     try{
//         await firstTask.save()
//         res.send(firstTask)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }

//     // firstTask.save().then((result)=>{
//     //     res.status(201).send(result)                            
//     // }).catch((error)=>{
//     //     res.status(400).send(error)
//     // })
// })

// app.get('/users',async (req,res)=>{

//     try{
//         const user=await users.find()
//         const count=await users.countDocuments()
//         res.send({user:user,docs:count})
//     }
//     catch(e){
//         res.status(500).send(e)
//     }

//     // users.find({}).then((result)=>{
//     //     res.send(result)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })
// })

// app.get('/users/:id',async (req,res)=>{
//     const id=req.params.id

//     try{
//         const user=await users.findById(id)
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }

//     // users.findById(id).then((result)=>{
//     //     if(result==undefined)
//     //         return res.status(404).send('not found')
//     //     res.status(302).send(result)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })

// })

// app.get('/tasks',async (req,res)=>{

//     try{
//         const tasks=await task.find(null,null,{sort:['description']})
//         res.send(tasks)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }

//     // task.find().then((result)=>{
//     //     if(result.length==0)
//     //         return res.status(404).send('No task created yet')
//     //     res.status(302).send(result)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })
// })

// app.get('/tasks/:id',async (req,res)=>{
//     const id=req.params.id

//     try{
//         const found=await task.findById(id)
//         res.send(found)
//     }
//     catch(e){
//         res.status(404).send(e)
//     }

//     // task.findById(id).then((result)=>{
//     //     if(result==undefined)
//     //         return res.status(404).send("No task found")
//     //     res.status(302).send(result)
//     // }).catch((error)=>{
//     //     res.send(error)
//     // })

// })

// app.patch("/user/:id",async (req,res)=>{
//     // validate update keys from client
//     const updates=Object.keys(req.body)
//     const allowedUpdates=['name','email','password','age']
//     var check=true
//     updates.forEach((ele)=>{
//         if(!allowedUpdates.includes(ele))
//             check = false
//     }) 
//     if(!check)
//         return res.send({error:'invalid update request'})
    
//     // if valid updates then proceed with update process
//     try{
//         const user=await users.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

//         if(!user)
//             return res.status(404).send({error:'No user with id found'})
//         res.status(200).send(user)
        
//     }catch(e){
//         res.send(400).send(e)

//     }
    
// })

// app.patch('/task/:id',async (req,res)=>{
    
//     try{
//         const tasks=await task.findByIdAndUpdate(req.params.id,req.body,{new:true})
//         if(!task)
//             return res.status(404).send({error:'task not found'})
//         res.status(200).send(tasks)

//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// app.delete('/users/:id',async (req,res)=>{
//     try{
//         const user=await users.findByIdAndDelete(req.params.id)
//         if(!user)
//             return res.status(404).send({error:'user not found'})
//         res.send(user)

//     }catch(e){
//         res.status(400).send(e)

//     }
// })

app.listen(port,()=>{
    console.log('server listerning on port',port)
})
  
const bcrypt=require('bcryptjs')

const myfunction=async ()=>{
    const s='aayush'
    const hashedPassword=await bcrypt.hash(s,8)
    const isMatch=await bcrypt.compare('aayush',hashedPassword)
    console.log(isMatch)
 
}
myfunction()