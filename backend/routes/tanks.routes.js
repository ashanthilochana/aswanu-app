import TanksController from "../controllers/tanks.controller.js";

import express from 'express';

let router = express.Router();

// add tank data
router.post("/api/tank/add", TanksController.addTanksData);

// get tank data
router.get("/api/tank/get", TanksController.getTanksData);

// delete tank data
router.delete("/api/tank/delete/:id", TanksController.deleteTanksData);

// update tank data
router.put("/api/tank/update/:id", TanksController.updateTanksData);

// get tank data by id
router.get("/api/tank/get/:id", TanksController.getTanksDataById);

export default router;