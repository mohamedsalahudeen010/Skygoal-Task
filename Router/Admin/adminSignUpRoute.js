import express from "express"
import bcrypt from "bcryptjs"
import { Admin } from "../../Model/admin.js"


const router=express.Router()

router.post("/",async(req,res)=>{
    try {
       let admin= await Admin.findOne({email:req.body.email})
       if(admin){return res.status(409).json({message:"Email Already Exist"})}
       
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(req.body.password,salt);
       admin = await new Admin({
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


export const adminSignUpRouter=router