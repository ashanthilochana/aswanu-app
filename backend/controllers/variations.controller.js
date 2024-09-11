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

export default RiceVariationController;