import SensorController from "../controllers/sensor.controller.js";

import express from 'express';

let router = express.Router();

router.get("/api/sensor/logs", SensorController.getSensorLogs);


// updateDeviceStatus
router.post("/api/device/status", SensorController.updateDeviceStatus);


export default router;