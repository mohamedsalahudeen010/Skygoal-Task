import express from "express"
import obj from "mongodb"
const objectId = obj.ObjectId;

const router=express.Router();
import Cart from "../../Model/cart.js";

router.post("/", async (req, res) => {
    try {
      const cart = await Cart.create(req.body);
      res.status(200).json("Products added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  router.put("/:id", async (req, res) => {
    
    
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: req.params.id },
      { $set: req.body },
      { new: true });
      res.status(200).json("Products Updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });




    router.get("/", async (req, res) => {
      const {query}=req.query
        
        try { 
          const cart = await Cart.find(query);
          if (!cart) {
            res.status(400).json({ message: "can't get the Cart data" });
          }
          res.status(200).json(cart);
        } catch (error) {
          console.log(error);
          res.status(500).json("Server Error");
        }
      });



      router.delete("/:id",async(req,res)=>{
        try {
            const deleteContent=await Cart.findByIdAndDelete(
                {_id:req.params.id},
            )   
            if(!deleteContent){return res.status(400).json({message:"Couldn'nt delete your content"})}
            return res.status(200).json({message:"Deleted Successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal server error"})
        }
    
        
    })

    router.delete("/",async(req,res)=>{
      try {
          const deleteWholeCart=await Cart.deleteMany(
              {},
          )   
          if(!deleteWholeCart){return res.status(400).json({message:"Couldn'nt delete your content"})}
          return res.status(200).json({message:"Deleted Successfully"})
      } catch (error) {
          console.log(error);
          res.status(500).json({message:"Internal server error"})
      }
  
      
  })


export const cartRouter=router