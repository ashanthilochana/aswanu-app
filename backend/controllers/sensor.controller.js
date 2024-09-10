import SensorService from "../services/sensor.service.js";

let SensorController = {};

SensorController.getSensorLogs = async (req, res) => {
    try {
        let sensorLogs = await SensorService.getAllSensorLogs();
        res.status(200).send(sensorLogs);
    } catch (error) {
        res.status(500).send({message : "Internal Server error occurred while fetching sensor logs"});
    }
}

export default SensorController;