import SolutionsController from "../controllers/solutions.controller.js";

import express from 'express';

let router = express.Router();

// add solutions data
router.post("/api/solutions/add", SolutionsController.addSolutionsData);


export default router;