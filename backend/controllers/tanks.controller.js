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

export default TanksController;