const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{             //connect to mongodb database
    useNewUrlParser:true,
})

const user=mongoose.model('user',{                                          // created model User
    name:{

        type:String,
        trime:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Not a valid email address")
        }
        
    },
    age:{
        type:Number,
        default:0
        
    }
})

const me=new user({
    name:'aayush',
    email:'Aayuspandey@gmail.com',
    age:'21'
})

me.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log('error',error)
})


// const task=mongoose.model('task',{                                          // created model task
//     description:{
//         type:String

//     },
//     status:{
//         type:Boolean
//     }
// }
// )



// const task1=new task({
//     description:'create task model',
//     status:false
// })

// task1.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })



