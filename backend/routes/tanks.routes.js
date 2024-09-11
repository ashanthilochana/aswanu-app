import TanksController from "../controllers/tanks.controller.js";

import express from 'express';

let router = express.Router();

// add sensor data
router.post("/api/tank/add", TanksController.addTanksData);


export default router;