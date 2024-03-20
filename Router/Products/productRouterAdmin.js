import express from "express"
import Products from "../../Model/Product.js";

const router=express.Router();


router.get("/", async (req, res) => {
  const {product}=req.query;
  console.log(product)
    try {
      if(product){
        const products = await Products.find({$or:[
        {name:{$regex:product,$options:`i`}},
        {varient:{$regex:product,$options:`i`}},
        {brand:{$regex:product,$options:`i`}},
        {productGroup:{$regex:product,$options:`i`}},
        {productSubGroup:{$regex:product,$options:`i`}}]});
        if (!products) {
          res.status(400).json({ message: "can't get the data" });
        }
        res.status(200).json(products);
      }
      else{
      const products = await Products.find({});
      if (!products) {
        res.status(400).json({ message: "can't get the data" });
      }
      res.status(200).json(products);
    }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });

  router.post("/", async (req, res) => {
    try {
      let product = await Products.findOne({$and:
        [{name:{$eq:req.body.name}},{varient:{$eq:req.body.varient}}]});;
      
      if(product){
        return  res.status(409).json({message:"Product Already Exist"})
      }
      product=await Products.create(req.body)
      res.status(200).json("Products added Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const updatedContent = await Products.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedContent) {
        return res.status(400).json({ message: "Couldn'nt update your content" });
      }
      return res.status(200).json("updated Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.delete("/:id",async(req,res)=>{
    try {
        const deleteContent=await Products.findByIdAndDelete(
            {_id:req.params.id},
        )   
        if(!deleteContent){return res.status(400).json({message:"Couldn'nt delete your content"})}
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

    
})



router.delete("/all",async(req,res)=>{
  try {
      const deleteWholeCart=await Products.deleteMany(
          {},
      )   
      if(!deleteWholeCart){return res.status(400).json({message:"Couldn'nt delete your content"})}
      return res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }

  
})


  export const productsRouterAdmin = router;