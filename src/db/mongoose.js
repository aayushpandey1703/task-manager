const mongoose=require('mongoose')
// const validator=require('validator')

mongoose.connect(process.env.MONGODB_CONNECT,{             //connect to mongodb database
    useNewUrlParser:true,
})

console.log("db connected")

