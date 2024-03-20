import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    userMail:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    products:{
        type:[],
        required:true
    },
    

    
})

const Order=mongoose.model("orders",orderSchema)


export default Order