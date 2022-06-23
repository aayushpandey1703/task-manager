const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({                                          // created model task
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:2

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}})

const task=mongoose.model('task',taskSchema)

module.exports=task