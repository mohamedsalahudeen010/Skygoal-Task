import express from "express"
import bcrypt from "bcryptjs"
import { User } from "../../Model/User.js"

const router=express.Router()

router.post("/",async(req,res)=>{
    try {
       let user= await User.findOne({email:req.body.email})
       if(user){return res.status(409).json({message:"Email Already Exist"})}
       
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(req.body.password,salt);
       user = await new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        phone:req.body.phone
       }).save()

       return res.status(200).json({message:"SignedUp Successfully"})
    } catch (error) {
      console.log("error",error) 
      return res.status(500).json({message:"Internal Server Error"}) 
    }
})


export const userSignUpRouter=router