import express from "express"
import razorPayController from "../controllers/razorPayController.js"

const router=express.Router()
//Getting order Id
router.post("/order",razorPayController.order)

//PaymentCapture

router.post("/paymentCapture",razorPayController.paymentCapture)



export default router