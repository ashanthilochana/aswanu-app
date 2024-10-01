import RiceVariationService from "../services/variations.service.js";

let RiceVariationController = {};

// add rice variation data
RiceVariationController.addRiceVariationData = async (req, res) => {
    try {
        let data = req.body;
        await RiceVariationService.addRiceVariationData(data);
        res.status(200).send("Data saved successfully");
      } catch (error) {
        console.error("Error saving solution data to firestore : ", error);
        res.status(500).send(error);
      }
};

// get rice variation data
RiceVariationController.getRiceVariationData = async (req, res) => {
    try {
        let data = await RiceVariationService.getRiceVariationData();
        res.status(200).send(data);
      } catch (error) {
        console.error("Error fetching solution data from firestore : ", error);
        res.status(500).send(error);
      }
};

// update rice variation data
/*RiceVariationController.updateTanksData = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters
  const data = req.body; // Extract data from request body

  try {
      // Call a function to update sensor data in firestore
      await RiceVariationService.updateRiceVariationData(id, data);
      res.status(200).json({ message: " data updated successfully" });
  } catch (error) {
      res.status(500).json({ error: "Failed to update  data" });
  }
}

// Get tanks by id
RiceVariationController.getRiceVariationDataById = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters

  try {
      // Call a function to get  data by id from firestore
      const RiceVariationData = await RiceVariationService.getRiceVariationDataById(id);
      res.status(200).json(tankData);
  } catch (error) {
      res.status(500).json({ error: "Failed to get get data by id" });
  }
}
*/

// Update rice variation data
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

// Get rice variation data by id
RiceVariationController.getRiceVariationDataById = async (req, res) => {
  const id = req.params.id; // Extract id from request parameters

  try {
      // Call a function to get rice variation data by id from Firestore
      const riceVariationData = await RiceVariationService.getRiceVariationDataById(id);
      res.status(200).json(riceVariationData);
  } catch (error) {
      console.error("Error fetching rice variation data by id from Firestore: ", error);
      res.status(500).json({ error: "Failed to get rice variation data by id" });
  }
};


export default RiceVariationController;