import UserController from "../controllers/user.controller.js";
import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// user sign up
router.post("/api/user/sign-up", UserController.addUser);

// user sign in
router.post("/api/user/sign-in", AuthController.authenticateUser);

// user sign out
router.get("/api/user/sign-out", (req, res) => {
  res.clearCookie("session");
  res.sendStatus(200);
});

// get all users
router.get("/api/user/all", verifyToken, UserController.getAllUsers);

export default router;
