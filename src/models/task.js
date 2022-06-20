const mongoose=require('mongoose')

const task=mongoose.model('task',{                                          // created model task
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
})

module.exports=task