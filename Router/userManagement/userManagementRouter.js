import express from "express";
import { User } from "../../Model/User.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const email=req.query.email
  try {
    const user = await User.find({email:email});
    if (!user) {
      res.status(400).json({ message: "can't get the Actor data" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

router.put("/:id", async (req, res) => {
    try {
      const updatedUser= await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(400).json({ message: "Couldn'nt update" });
      }
      return res.status(200).json("updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/:id",async(req,res)=>{
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
    }
  )
export const userManagementRouter = router;
