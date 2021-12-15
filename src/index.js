const express=require('express')
require('./db/mongoose')
const users=require('./models/users')

const app=express()
const port=process.env.PORT || 3000
app.use(express.json())                                             // parse json client request into object

app.post('/users',(req,res)=>{
    const first=new users(req.body)                                 

    first.save().then((result)=>{
        res.send(result)
    }).catch((error)=>{                                             // handle error in inserting data to server
    res.status(400).send(error)                                     // to get list of http status code visit https://httpstatuses.com/
    })

})

app.listen(port,()=>{
    console.log('server listerning on port',port)
})
  