import SensorController from "../controllers/sensor.controller.js";

import express from 'express';

let router = express.Router();

// add sensor data
router.post("/api/sensor/data", SensorController.addSensorData);

router.get("/api/sensor/logs", SensorController.getSensorLogs);

// updateDeviceStatus
router.post("/api/device/status", SensorController.updateDeviceStatus);




export default router;