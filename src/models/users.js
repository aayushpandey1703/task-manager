const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({                                      
    name:{
        type:String,                                                        
        trim:true,
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
        minLength:[6,'password is too short minimum length must be 6'],
        validate(value){
            if(value.toLowerCase().includes('password')){
                return value.replace('password','aayush')
            }
        }
    },
    age:{
        type:Number,
        default:0
        
    },
    tokens:[{
        token:{
            type:String,
            requried:true
        }
    }
    ]
})

userSchema.statics.findByCredentials=async (email,password)=>{      //function for model
    const user = await users.findOne({email:email})
    if(!user)
        throw new Error('No user available')
    const check=await bcrypt.compare(password,user.password)
    if(!check)
        throw new Error('Unable to login')
    return user
        
}

userSchema.methods.generateAuthToken=async function(){         // function for model instance to store genrated token to db
    const userw=this
    const token=jwt.sign({_id:userw._id.toString()},"newtoken")
    userw.tokens=userw.tokens.concat({token:token})
    await userw.save()
    return token
}

userSchema.methods.getPublicData=function(){
    var userw=this.toObject()                   //The toObject method is a method provided by Mongoose to clean up the object so it removes all of the metadata and methods (like .save() or .toObject()) that Mongoose attaches to it. It just becomes a regular object afterward. 
    delete userw.password
    delete userw.tokens
    console.log(typeof userw)
    return userw
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