import TankController from "../controllers/tank.controller.js";
import express from "express";

const router = express.Router();

// GET: Get all tanks
router.get("/api/tanks/get", TankController.fetchAllTanks);

// add new tank
router.post("/api/tank/add", TankController.addTank);

export default router;
