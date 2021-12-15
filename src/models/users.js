const mongoose=require('mongoose')
const validator=require('validator')

const users=mongoose.model('users',{                                      
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
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                return value.replace('password','aayush')
            }
        }
    },
    age:{
        type:Number,
        default:0
        
    }
})

module.exports=users