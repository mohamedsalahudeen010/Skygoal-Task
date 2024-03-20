import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:String,       
    },
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:true,
    }

})

const genAuthToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_CODE)
}

const User=mongoose.model("user",userSchema)

export{User,genAuthToken}