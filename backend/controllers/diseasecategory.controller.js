import DiseaseCategoryService from "../services/diseasecategory.service.js";

let DiseaseCategoryController = {};

// Add rice disease category data
DiseaseCategoryController.addDiseaseCategoryData = async (req, res) => {
    try {
        let data = req.body;
        await DiseaseCategoryService.addDiseaseCategoryData(data);
        res.status(200).send("Rice disease category data saved successfully");
    } catch (error) {
        console.error("Error saving rice disease category data to Firestore: ", error);
        res.status(500).send(error);
    }
};

// Get all rice disease category data
DiseaseCategoryController.getDiseaseCategoryData = async (req, res) => {
    try {
        let data = await DiseaseCategoryService.getDiseaseCategoryData();
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching rice disease category data from Firestore: ", error);
        res.status(500).send(error);
    }
};

// Update rice disease category data
DiseaseCategoryController.updateDiseaseCategoryData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters
    const data = req.body; // Extract data from request body

    try {
        await DiseaseCategoryService.updateDiseaseCategoryData(id, data);
        res.status(200).json({ message: "Rice disease category data updated successfully" });
    } catch (error) {
        console.error("Error updating rice disease category data in Firestore: ", error);
        res.status(500).json({ error: "Failed to update rice disease category data" });
    }
};

// Get rice disease category data by id
DiseaseCategoryController.getDiseaseCategoryDataById = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        const DiseaseCategoryData = await DiseaseCategoryService.getDiseaseCategoryDataById(id);
        res.status(200).json(riceDiseaseCategoryData);
    } catch (error) {
        console.error("Error fetching rice disease category data by id from Firestore: ", error);
        res.status(500).json({ error: "Failed to get rice disease category data by id" });
    }
};

// Delete rice disease category data
DiseaseCategoryController.deleteDiseaseCategoryData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        await DiseaseCategoryService.deleteDiseaseCategoryData(id);
        res.status(200).json({ message: "Rice disease category data deleted successfully" });
    } catch (error) {
        console.error("Error deleting rice disease category data from Firestore: ", error);
        res.status(500).json({ error: "Failed to delete rice disease category data" });
    }
};

export default DiseaseCategoryController;
