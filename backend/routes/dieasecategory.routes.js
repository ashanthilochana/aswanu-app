import DiseaseCategoryController from "../controllers/diseasecategory.controller.js";
import express from 'express';

let router = express.Router();

// Add rice disease category data
router.post("/api/disease-category/add", DiseaseCategoryController.addDiseaseCategoryData);

// Get all rice disease category data
router.get("/api/disease-category/get", DiseaseCategoryController.getDiseaseCategoryData);

// Update rice disease category data by ID
router.put("/api/disease-category/update/:id", DiseaseCategoryController.updateDiseaseCategoryData);

// Get rice disease category data by ID
router.get("/api/disease-category/get/:id", DiseaseCategoryController.getDiseaseCategoryDataById);

// Delete rice disease category data by ID
router.delete("/api/disease-category/delete/:id", DiseaseCategoryController.deleteDiseaseCategoryData);

export default router;
