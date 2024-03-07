import express from "express";
import foodController from "../controllers/foodController.js"
import auth from "../helper/auth.js";

const router = express.Router();

router.get("/getAllfoods",  auth.authenticate,auth.adminGuard, foodController.getAllfoods);


export default router