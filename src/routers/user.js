const express=require('express')
const users=require('../models/users')  
const tasks=require('../models/task')
const auth=require('../middleware/auth')
// image packages
const multer=require('multer')          // for uploading files
const sharp=require('sharp')          // for formatting images

const upload = multer({
    limits:{
        fileSize: 3000000
    },
    fileFilter(req,file,cb){                                // check file type
        if(!file.originalname.match(/(\.jpg|\.jpeg|\.png)/)) // using regex to match file extension use online regex compiler
            return cb(new Error("image not supported"))         // send error if not error
        cb(undefined,true)                                  // else accept
    }

})
const email=require('../email/account')

const Route=new express.Router()


Route.post('/users',async (req,res)=>{
    const first=new users(req.body)  
   
    // same response using async-await
    try{
        await first.save()                                                  // when save() methos used with model instance it creates new user
        email.sendWelcomeEmail(first.email,first.name)
        console.log("reached")
        const token=await first.generateAuthToken()
        res.send({user:first,token:token})
    }
    catch(e){
        if(e.code==11000)
            return res.send({error:'email already exists'})
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
        const token = await user.generateAuthToken()

        res.send({user:user.getPublicData(),token:token})

    }
    catch(e)
        {
            res.status(500).send(e)
        }
        
})

Route.post('/user/logout',auth, async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send('user logged out')
    }
    catch(e){
        res.status(501).send({error:e})

    }
})

Route.get('/users',async (req,res)=>{
    try{
        const user=await users.getPublicData()
        res.send(user)

    }
    catch(e){
        res.status(500).send(e)

    }
})

Route.get('/users/me',auth,async (req,res)=>{               // get profile of only loggedin user using jwt

    const user=req.user.JSON()
    res.send(user)
 
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
Route.patch("/user",auth,async (req,res)=>{
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
        const user=await users.findById(req.user._id)
        if(!user)
            return res.status(404).send({error:'No user with id found'})

        updates.forEach((ele)=>{
            user[ele]=req.body[ele]
        })
        await user.save()   // when save() method used with object it updates the existing user

       
        res.status(200).send(user)
        
    }catch(e){
        res.send(500).send(e)

    }
    
})
Route.delete('/users',auth,async (req,res)=>{
    try{
        await tasks.deleteMany({owner:req.user._id})
        const user=await users.findByIdAndDelete(req.user._id)
        if(!user)
            return res.status(404).send({error:'user not found'})
        email.sendDeleteEmail(user.email,user.name)
        res.send(user)

    }catch(e){
        res.status(400).send(e)

    }
})

// USER IMAGE ROUTES

Route.get("/user/avatar/:id",async (req,res)=>{
    try
{    const user=await users.findById(req.params.id)
    if(!user)
        throw new error("no image")
    res.set("Content-Type","image/jpeg")
    res.send(user.avatar)
}
catch(e)
{
    res.status(500).send({error:e})
}
})

Route.post("/users/me/avatar",auth,upload.single('avatar') /* 'avatar' parameter and form-data key at client side must be same */, async (req,res)=>{
    const buffer=await sharp(req.file.buffer).jpeg().resize({width:250,height:250}).toBuffer()

    req.user.avatar=buffer
    await req.user.save()
    res.send("file uploaded")
},(err,req,res,next)=>{
    res.status(400).send({error:err.message})           // handle multer error to get JSON response
})

Route.delete("/users/me/avatar",auth,async (req,res)=>{
try
    {    req.user.avatar=undefined
    await req.user.save()
    res.send("profile pic deleted")
}
catch(e){
    res.status(500).send({error:e})
}
})

Route.patch("/users/me/avatar",auth,upload.single('avatar'),async (req,res)=>{
    try{
        const buffer=await sharp(req.file.buffer).jpeg().resize({width:250,height:250}).toBuffer()
        req.user.avatar=buffer
        await req.user.save()
        res.send("image updated")

    }
    catch(e)
    {
        res.status(500).send('ss')
    }
},(err,req,res,next)=>{
    res.status(400).send({error:err.message})
})

module.exports=Route

