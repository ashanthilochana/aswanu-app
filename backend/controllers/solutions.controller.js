import SolutionService from "../services/solutions.service.js";

let SolutionsController = {};

// Add solution
SolutionsController.addSolutionData = async (req, res) => {
    const data = req.body; // Extract data from request body

    try {
        // Call a function to save solution data to Firestore
        await SolutionService.addSolutionData(data);
        res.status(200).json({ message: "Solution data added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add solution data" });
    }
}

// Get all solutions
SolutionsController.getSolutionsData = async (req, res) => {
    try {
        // Call a function to get all solution data from Firestore
        const solutionsData = await SolutionService.getSolutionsData();
        res.status(200).json(solutionsData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get solution data" });
    }
}

// Delete solution by ID
SolutionsController.deleteSolutionData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to delete solution data from Firestore
        await SolutionService.deleteSolutionData(id);
        res.status(200).json({ message: "Solution data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete solution data" });
    }
}

// Update solution by ID
SolutionsController.updateSolutionData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters
    const data = req.body; // Extract data from request body

    try {
        // Call a function to update solution data in Firestore
        await SolutionService.updateSolutionData(id, data);
        res.status(200).json({ message: "Solution data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update solution data" });
    }
}

// Get solution by ID
SolutionsController.getSolutionDataById = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to get solution data by id from Firestore
        const solutionData = await SolutionService.getSolutionDataById(id);
        res.status(200).json(solutionData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get solution data by id" });
    }
}

export default SolutionsController;
