const express=require('express')
require('./db/mongoose')
const users=require('./models/users')
const task=require('./models/task')

const app=express()
const port=process.env.PORT || 3000
app.use(express.json())                                             // parse json client request into object

app.post('/users',(req,res)=>{
    const first=new users(req.body)                                 

    first.save().then((result)=>{
        res.status(201).send(result)
    }).catch((error)=>{                                             // handle error in inserting data to server
    res.status(400).send(error)                                     // to get list of http status code visit https://httpstatuses.com/
    })

})

app.post('/tasks',(req,res)=>{                      //to test post method endpoint use postman app
    const firstTask=new task(req.body)

    firstTask.save().then((result)=>{
        res.status(201).send(result)                            
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.get('/users',(req,res)=>{
    users.find({}).then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/users/:id',(req,res)=>{
    const id=req.params.id

    users.findById(id).then((result)=>{
        if(result==undefined)
            return res.status(404).send('not found')
        res.status(302).send(result)
    }).catch((error)=>{
        res.status(500).send(error)
    })

})

app.listen(port,()=>{
    console.log('server listerning on port',port)
})
  