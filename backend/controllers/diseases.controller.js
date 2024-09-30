import DiseaseService from "../services/diseases.service";

let DiseaseController = {};

// Add disease
DiseaseController.addDiseaseData = async (req, res) => {
    const data = req.body; // Extract data from request body

    try {
        // Call a function to save disease data to firestore
        await DiseaseService.addDiseaseData(data);
        res.status(200).json({ message: "Disease data added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add disease data" });
    }
    
}

// Get diseases
DiseaseController.getDiseaseData = async (req, res) => {
    try {
        // Call a function to get disease data from firestore
        const diseasesData = await DiseaseService.getDiseaseData();
        res.status(200).json(diseasesData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get disease data" });
    }
}

// Delete disease
DiseaseController.deleteDiseaseData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to delete disease data from firestore
        await DiseaseService.deleteDiseaseData(id);
        res.status(200).json({ message: "Disease data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete disease data" });
    }
}

// Update disease
DiseaseController.updateDiseaseData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters
    const data = req.body; // Extract data from request body

    try {
        // Call a function to update disease data in firestore
        await DiseaseService.updateDiseaseData(id, data);
        res.status(200).json({ message: "Disease data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update disease data" });
    }
}

// Get disease by id
DiseaseController.getDiseaseDataById = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to get disease data by id from firestore
        const diseaseData = await DiseaseService.getDiseaseDataById(id);
        res.status(200).json(diseaseData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get disease data by id" });
    }
}

export default DiseaseController;