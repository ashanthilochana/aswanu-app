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

export default RiceVariationController;