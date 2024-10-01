import SolutionsController from "../controllers/solutions.controller.js";

import express from 'express';

let router = express.Router();

// Add solution data
router.post("/api/solutions/add", SolutionsController.addSolutionData);

// Get all solution data
router.get("/api/solutions/get", SolutionsController.getSolutionsData);

// Delete solution data by ID
router.delete("/api/solutions/delete/:id", SolutionsController.deleteSolutionData);

// Update solution data by ID
router.put("/api/solutions/update/:id", SolutionsController.updateSolutionData);

// Get solution data by ID
router.get("/api/solutions/get/:id", SolutionsController.getSolutionDataById);

export default router;
