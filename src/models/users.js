const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({                                      
    name:{

        type:String,                                                        
        trime:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
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

userSchema.statics.findByCredentials=async (email,password)=>{
    const user = await users.findOne({email:email})
    if(!user)
        throw new Error('No user available')
    const check=await bcrypt.compare(password,user.password)
    if(!check)
        throw new Error('Unable to login')
    return user
        
}

// Hash plain text password to hashed password
userSchema.pre('save',async function(next){         // operation to perform on document before saving to db
    const user=this
    if(user.isModified('password'))                 // true if new user created or user password modified
    {
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
    
})

const users=mongoose.model('users',userSchema)


module.exports=users