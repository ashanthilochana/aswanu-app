import RiceVariationService from "../services/variations.service.js";

let RiceVariationController = {};

// add rice variations
RiceVariationController.addRiceVariationData = async (req, res) => {
  const data = req.body; // Extract data from request body

  try {
      // Call a function to save rice variation data to Firestore
      await RiceVariationService.addRiceVariationData(data);
      res.status(200).json({ message: "Rice variation data added successfully" });
  } catch (error) {
      console.error("Error saving rice variation data to Firestore: ", error);
      res.status(500).json({ error: "Failed to add rice variation data" });
  }
};

// get rice variations
RiceVariationController.getRiceVariationData = async (req, res) => {
  try {
      const riceVariationData = await RiceVariationService.getRiceVariationData();
      res.status(200).json(riceVariationData);
  } catch (error) {
      console.error("Error fetching rice variation data from Firestore: ", error);
      res.status(500).json({ error: "Failed to get rice variation data" });
  }
};

// Delete rice variations
RiceVariationController.deleteRiceVariationData = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters

  try {
      // Call a function to delete rice variation data from Firestore
      await RiceVariationService.deleteRiceVariationData(id);
      res.status(200).json({ message: "Rice variation data deleted successfully" });
  } catch (error) {
      console.error("Error deleting rice variation data from Firestore: ", error);
      res.status(500).json({ error: "Failed to delete rice variation data" });
  }
};

// Update rice variations
RiceVariationController.updateRiceVariationData = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters
  const data = req.body; // Extract data from request body

  try {
      // Call a function to update rice variation data in Firestore
      await RiceVariationService.updateRiceVariationData(id, data);
      res.status(200).json({ message: "Rice variation data updated successfully" });
  } catch (error) {
      console.error("Error updating rice variation data in Firestore: ", error);
      res.status(500).json({ error: "Failed to update rice variation data" });
  }
};




// Get rice variations by id
RiceVariationController.getRiceVariationDataById = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters

  try {
      // Call a function to get rice variation data by id from Firestore
      const riceVariationData = await RiceVariationService.getRiceVariationDataById(id);
      res.status(200).json(riceVariationData);
  } catch (error) {
      console.error("Error getting rice variation data by id from Firestore: ", error);
      res.status(500).json({ error: "Failed to get rice variation data" });
  }
};

export default RiceVariationController;