import SolutionsController from "../controllers/solutions.controller.js";

import express from 'express';

let router = express.Router();

// add solutions data
router.post("/api/solutions/add", SolutionsController.addSolutionsData);

// get solutions data
router.get("/api/solutions/get", SolutionsController.getSolutionsData);

// get solutions data by id
router.get("/api/solutions/get/:solutionId", SolutionsController.getSolutionsDataById);

// get solution data by name
router.get("/api/solutions/get/name/:solutionName", SolutionsController.getSolutionsDataByName);

// delete solution data by name
router.delete("/api/solutions/delete/name/:solutionName", SolutionsController.deleteSolutionsDataByName);


export default router;