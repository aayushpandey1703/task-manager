const express=require("express")
const multer=require("multer")
const upload=multer()
const app=express()

app.get("/",(req,res)=>{
    res.sendfile("./playground/file.html")
})

app.post("/upload",upload.single('upload'),(req,res)=>{
    res.send(req.file.buffer)
})

app.listen(5000,()=>{
    console.log('server up')
})