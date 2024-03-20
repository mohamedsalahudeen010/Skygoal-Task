import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userMail:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productVarient:{
        type:Number,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productPricePerItem:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },

    
})

const Cart=mongoose.model("cart",cartSchema)


export default Cart