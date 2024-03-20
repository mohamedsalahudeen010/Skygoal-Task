import express from "express"
import obj from "mongodb"
import Order from "../../Model/Order.js";
const objectId = obj.ObjectId;

const router=express.Router();

  
    router.get("/", async (req, res) => {
      const query=req.query
        
        try { 
          let order
          if(query){
            order = await Order.find(query)
          }
          else{
            order = await Order.find()
          }
          
          if (!order) {
            res.status(400).json({ message: "can't get the Orders data" });
          }
          res.status(200).json(order);
        } catch (error) {
          console.log(error);
          res.status(500).json("Server Error");
        }
      });
  


      router.delete("/:id",async(req,res)=>{
        try {
            const deleteOrder=await Order.findByIdAndDelete(
                {_id:req.params.id},
            )   
            if(!deleteOrder){return res.status(400).json({message:"Couldn'nt delete your content"})}
            return res.status(200).json({message:"Deleted Successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal server error"})
        }
    
        
    })

    router.delete("/",async(req,res)=>{
      try {
          const deleteWholeOrder=await Order.deleteMany(
              {},
          )   
          if(!deleteWholeOrder){return res.status(400).json({message:"Couldn'nt delete your content"})}
          return res.status(200).json({message:"Deleted Successfully"})
      } catch (error) {
          console.log(error);
          res.status(500).json({message:"Internal server error"})
      }
  
      
  })


export const orderRouterAdmin=router