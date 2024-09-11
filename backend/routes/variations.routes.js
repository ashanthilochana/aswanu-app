import RiceVariationController from "../controllers/variations.controller.js";

import express from 'express';

let router = express.Router();

// add rice variation data
router.post("/api/variation/add", RiceVariationController.addRiceVariationData);

// get rice variation data
router.get("/api/variation/get", RiceVariationController.getRiceVariationData);

export default router;