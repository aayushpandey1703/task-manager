const mongoose=require('mongoose')

const task=mongoose.model('task',{                                          // created model task
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:2

    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports=task