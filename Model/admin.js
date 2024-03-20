import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const adminSchema=mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:true,
    }
})

const genAdminAuthToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_CODE_ADMIN)
}

const Admin=mongoose.model("admin",adminSchema)

export{Admin,genAdminAuthToken}