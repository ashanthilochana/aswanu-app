import TanksService from "../services/tanks.service.js";

let TanksController = {};

// Add tanks
TanksController.addTanksData = async (req, res) => {
    const data = req.body; // Extract data from request body

    try {
        // Call a function to save sensor data to firestore
        await TanksService.addTanksData(data);
        res.status(200).json({ message: "Sensor data added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add sensor data" });
    }
    
}

// Get tanks
TanksController.getTanksData = async (req, res) => {
    try {
        // Call a function to get sensor data from firestore
        const tanksData = await TanksService.getTanksData();
        res.status(200).json(tanksData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get sensor data" });
    }
}

// Delete tanks
TanksController.deleteTanksData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to delete sensor data from firestore
        await TanksService.deleteTanksData(id);
        res.status(200).json({ message: "Sensor data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete sensor data" });
    }
}

// Update tanks
TanksController.updateTanksData = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters
    const data = req.body; // Extract data from request body

    try {
        // Call a function to update sensor data in firestore
        await TanksService.updateTanksData(id, data);
        res.status(200).json({ message: "Sensor data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update sensor data" });
    }
}

// Get tanks by id
TanksController.getTanksDataById = async (req, res) => {
    const id = req.params.id; // Extract id from request parameters

    try {
        // Call a function to get sensor data by id from firestore
        const tankData = await TanksService.getTanksDataById(id);
        res.status(200).json(tankData);
    } catch (error) {
        res.status(500).json({ error: "Failed to get sensor data by id" });
    }
}



export default TanksController;