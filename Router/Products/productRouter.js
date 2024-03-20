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

 



  export const productsRouter = router;