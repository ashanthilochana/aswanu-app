import DiseaseController from "../controllers/diseases.controller";

import express from 'express';

let router = express.Router();

// add disease data
router.post("/api/disease/add", DiseaseController.addDiseaseData);

// get disease data
router.get("/api/disease/get", DiseaseController.getDiseaseData);

// delete disease data
router.delete("/api/disease/delete/:id", DiseaseController.deleteDiseaseData);

// update disease data
router.put("/api/disease/update/:id", DiseaseController.updateDiseaseData);

// get disease data by id
router.get("/api/disease/get/:id", DiseaseController.getDiseaseDataById);

export default router;