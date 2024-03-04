import express from "express";
import userController from "../controllers/userController.js";
import auth from "../helper/auth.js";

const router = express.Router();
//create User

router.post("/createUser", userController.createUser);

//check User

router.post("/checkUser", userController.checkUser);

//Updating current user Food

router.post(
  "/updateFood/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.updateFood
);

router.get(
  "/getFood/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.getFood
);

router.get(
  "/TotalOrderedFood/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.TotalOrderedFood
);

router.get(
  "/sendOldCurrentFoodList/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.sendOldCurrentFoodList
);

router.get(
  "/editProfile/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.editProfile
);

router.put(
  "/updateProfile/:id",
  auth.authenticate,
  auth.adminGuard,
  userController.updateProfile
);

export default router;
