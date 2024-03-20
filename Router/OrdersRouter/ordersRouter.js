import express from "express"
import obj from "mongodb"
import Order from "../../Model/Order.js";


const router=express.Router();


router.post("/", async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(200).json("Order created Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
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
    const query=req.query
      try { 
        let order = await Order.find(query)
        if (!order) {
          res.status(400).json({ message: "can't get the Orders data" });
        }
        res.status(200).json(order);
      } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
      }
    });

    
    router.get("/admin", async (req, res) => {
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
  


      router.delete("/admin/:id",async(req,res)=>{
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


export const orderRouter=router