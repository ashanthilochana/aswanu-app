import SolutionsController from "../controllers/solutions.controller.js";

import express from 'express';

let router = express.Router();

// add solutions data
router.post("/api/solutions/add", SolutionsController.addSolutionsData);

// get solutions data
router.get("/api/solutions/get", SolutionsController.getSolutionsData);


export default router;