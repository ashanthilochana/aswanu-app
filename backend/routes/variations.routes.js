import RiceVariationController from "../controllers/variations.controller.js";

import express from 'express';

let router = express.Router();

// add rice variation data
router.post("/api/variation/add", RiceVariationController.addRiceVariationData);

// get rice variation data
router.get("/api/variation/get", RiceVariationController.getRiceVariationData);

// Update rice variation data
router.put("/api/variation/update/:id", RiceVariationController.updateRiceVariationData );

//get rice variation data by id
router.get("/api/variation/get/:id", RiceVariationController.getRiceVariationDataById );


export default router;