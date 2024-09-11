import SensorService from "../services/sensor.service.js";

let SensorController = {};


// Add sensor data to firestore
SensorController.addSensorData = async (req, res) => {
    const data = req.body; // Extract data from request body

    try {
        // Call a function to save sensor data to firestore
        await SensorService.addSensorData(data);
        res.status(200).json({ message: "Sensor data added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add sensor data" });
    }
    
}


SensorController.getSensorLogs = async (req, res) => {
    try {
        let sensorLogs = await SensorService.getAllSensorLogs();
        res.status(200).send(sensorLogs);
    } catch (error) {
        res.status(500).send({message : "Internal Server error occurred while fetching sensor logs"});
    }
}

SensorController.updateDeviceStatus = async (req, res) => {
      const { deviceName, status } = req.body; // Extract data from request body

      let newStatus = status === "on" ? true : false; // Convert status to boolean

      try {
        // Call a function to turn the device on or off, based on status
        await SensorService.updateDeviceStatus(deviceName, newStatus);
        res.status(200).json({ message: `${deviceName} turned ${status}` });
      } catch (error) {
        res.status(500).json({ error: `Failed to update ${deviceName} status.` });
      }
    }
 

export default SensorController;