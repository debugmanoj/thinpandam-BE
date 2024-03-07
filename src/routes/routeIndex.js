import express from "express"
import homePage from "../controllers/homePage.js";
import userRoutes from "./userRoutes.js"
import deliveryRoutes from "./deliveryRoutes.js"
import foodRoutes from  "./foodRoutes.js"
import adminRoutes from "./adminRoutes.js"

import razorPay from "./razorPay.js"

const router=express.Router();

router.get("/",homePage.homePage)

//user Routing ithu

router.use("/user",userRoutes)

router.use("/delivery",deliveryRoutes)

router.use("/food",foodRoutes)

router.use("/razorPay",razorPay)

router.use("/adminRoutes",adminRoutes)

export default router