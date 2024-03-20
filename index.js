import express from "express"
 const app=express();
 import cors from "cors"
 app.use(cors())
 import dotenv from "dotenv"
 dotenv.config();
 import dbConnection from "./DB.js";
 
import { isSignedInUser } from "./controllers/authUser.js";
import { isSignedInAdmin } from "./controllers/authAdmin.js";

import { userLoginRouter } from "./Router/User/userLogInRoute.js";
import { userSignUpRouter } from "./Router/User/userSignUpRoute.js";
import { adminLoginRouter } from "./Router/Admin/adminLogInRoute.js";
import { adminSignUpRouter } from "./Router/Admin/adminSignUpRoute.js";

import { adminManagementRouter } from "./Router/adminManagement/adminManagementRouter.js";
import { userManagementRouter } from "./Router/userManagement/userManagementRouter.js";
import { productsRouter } from "./Router/Products/productRouter.js";
import { productsRouterAdmin } from "./Router/Products/productRouterAdmin.js";
import { cartRouter } from "./Router/Cart/cartRouter.js";
import { orderRouter } from "./Router/OrdersRouter/ordersRouter.js";
import { orderRouterAdmin } from "./Router/OrdersRouter/ordersRouterAdmin.js";



 dbConnection()

 const PORT=process.env.PORT
 app.listen(PORT,()=>{
    console.log(`server is hoisted in ${PORT}`)
 })

 app.use(express.json())
 app.get("/",async(req,res)=>{
    res.send(`Web server Is Hoisted In ${PORT} Port Number`)
 })

app.use("/userLogin",userLoginRouter);
app.use("/userSignUp",userSignUpRouter);
app.use("/adminLogin",adminLoginRouter);
app.use("/adminSignUp",adminSignUpRouter);

app.use("/user",isSignedInUser,userManagementRouter);
app.use("/admin",isSignedInAdmin,adminManagementRouter);

app.use("/products",isSignedInUser,productsRouter);
app.use("/products/admin",isSignedInAdmin,productsRouterAdmin)
app.use("/cart",isSignedInUser,cartRouter)
app.use("/order",isSignedInUser,orderRouter)
app.use("/order/admin",isSignedInAdmin,orderRouterAdmin)







