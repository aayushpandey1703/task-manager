const mongoose=require('mongoose')
// const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{             //connect to mongodb database
    useNewUrlParser:true,
})

// const user=mongoose.model('user',{                                          // created model User
//     name:{

//         type:String,                                                        
//         trime:true,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,  
//         lowercase:true,
//         validate(value){                                                    // to add external validators that are not prebuilt like 
//             if(!validator.isEmail(value))                                   // to check if input is valid email or not 
//                 throw new Error("Not a valid email address")
//         }
        
//     }, 
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minLength:6,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 return value.replace('password','aayush')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0
        
//     }
// })

// const me=new user({                                                             // create instace of model to insert in collection
//     name:'aayush',
//     email:'Aayuspandey@gmail.com',
//     password:'password 1234',
//     age:'21'
// })

// me.save().then((result)=>{                                                      // insert document/instance to collection
//     console.log(result)
// }).catch((error)=>{
//     console.log('error',error)
// })


// const task=mongoose.model('task',{                                          // created model task
//     description:{
//         type:String,
//         required:true,
//         trime:true

//     },
//     status:{
//         type:Boolean,
//         default:false
//     }
// }
// )



// const task1=new task({
//     description:'create task model',
// })

// task1.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })



