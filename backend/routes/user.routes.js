import UserController from "../controllers/user.controller.js";
import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/user/sign-up", UserController.addUser);

router.post("/api/user/sign-in", AuthController.authenticateUser);

router.get("/api/user/sign-out", (req, res) => {
  res.clearCookie("session");
  res.sendStatus(200);
});

router.get("/api/user/all", verifyToken, UserController.getAllUsers);

export default router;
