import express from "express";
import adminAuth from "../helper/adminAuth.js"
import adminRoutesController from "../controllers/adminRoutesController.js";
const router = express.Router();

router.post("/checkAdmin",   adminRoutesController.checkAdmin);

router.get("/getAllFoods",   adminAuth.authenticate,adminAuth.adminGuard, adminRoutesController.getAllfoods);

router.post("/addFood",adminAuth.authenticate,adminAuth.adminGuard, adminRoutesController.addFood)
export default router