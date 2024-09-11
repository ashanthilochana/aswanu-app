import RiceVariationController from "../controllers/variations.controller.js";

import express from 'express';

let router = express.Router();

// add rice variation data
router.post("/api/variation/add", RiceVariationController.addRiceVariationData);

export default router;