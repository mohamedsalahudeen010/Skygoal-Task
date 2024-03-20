import express from "express"
import { User } from "../../Model/User.js";


const router=express.Router();


router.get("/", async (req, res) => {
    try {
      const user = await User.find({});
      if (!user) {
        res.status(400).json({ message: "can't get the User" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });




  router.delete("/oneUser/:id",async(req,res)=>{
    try {
        const deleteUser=await User.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteUser){return res.status(400).json({message:"Couldn'nt User"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteAllUsers=await User.deleteMany(
          {},
      )   
      if(!deleteAllUsers){return res.status(400).json({message:"Couldn'nt delete Users"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const adminManagementRouter = router;