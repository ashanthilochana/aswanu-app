import RiceVariationController from "../controllers/variations.controller.js";

import express from 'express';

let router = express.Router();

// add rice variation data
router.post("/api/variation/add", RiceVariationController.addRiceVariationData);

// get rice variation data
router.get("/api/variation/get", RiceVariationController.getRiceVariationData);

// Update rice variation data
router.put('/variation/:id', async (req, res) => {
    try {
      const id = req.params.id;  // Get the document ID from the route parameter
      const updatedData = req.body;  // Get the updated data from the request body
  
      await RiceVariationService.updateRiceVariationData(id, updatedData);
      res.status(200).send({ message: `Rice variation data with ID: ${id} updated successfully` });
    } catch (error) {
      res.status(500).send({ message: 'Error updating rice variation data', error });
    }
  });

export default router;