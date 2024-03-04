import express from "express";
import deliveryController from "../controllers/deliveryController.js";
import deliveryauth from "../helper/deliveryauth.js";

const router = express.Router();
//Creating User
router.post("/create", deliveryController.createDeliveryUser);

//Checking the login

router.post("/checkUser", deliveryController.checkDeliveryUser);

//Sending all customer list who status isClicked to false

router.get("/getDeliveryUser", deliveryController.getDeliveryUser);

//Updating isClicked and customer ID with the

router.patch("/updateStatus", deliveryController.updateDeliveryUser);

//Delivery person oda dashborad la yaaaruna iruntha update panrom

router.post(
  "/getAllValidCustomerDetails/:id",
  deliveryauth.authenticate,
  deliveryauth.deliveryGuard,
  deliveryController.getAllValidCustomerDetails
);

//Add Bid

router.post("/handleBid/:id", deliveryController.handleBid);

//Get bid

router.get("/getBid/:id", deliveryController.getBid);

//Update Bid

router.post("/updateBid/:id", deliveryController.updateBid);

//Getting deliveery bid amount

router.get("/getDeliveryBid/:id", deliveryController.getDeliveryBid);

//handleFixBid

router.post("/handleFixBid/:id", deliveryController.handleFixBid);

//Reset Fixed Bid

router.post("/ResetBid/:id", deliveryController.ResetBid);

//Accept panra route

router.post("/acceptBid/:id", deliveryController.acceptBid);

//Yellathayum tiruppi reset panrom

router.get("/resetAllFields/:id", deliveryController.resetAllFields);

//Ippo pending customer oda list mattum vaangurom

router.get(
  "/pendingCustomer/:id",
  deliveryauth.authenticate,
  deliveryauth.deliveryGuard,
  deliveryController.pendingCustomer
);

router.get(
  "/clearCustomerId/:id",
  deliveryauth.authenticate,
  deliveryauth.deliveryGuard,
  deliveryController.clearCustomerId
);

router.get(
  "/deliveryDetails/:id",
  deliveryauth.authenticate,
  deliveryauth.deliveryGuard,
  deliveryController.deliveryDetails
);

export default router;
