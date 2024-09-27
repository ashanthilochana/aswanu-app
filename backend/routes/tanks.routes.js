import TanksController from "../controllers/tanks.controller.js";

import express from 'express';

let router = express.Router();

// add sensor data
router.post("/api/tank/add", TanksController.addTanksData);

// get sensor data
router.get("/api/tank/get", TanksController.getTanksData);

export default router;