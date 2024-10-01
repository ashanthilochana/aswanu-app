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
        // Filter and map the sensor data to get only 'Malabe' data

        const sensorLogs = await SensorService.getAllSensorLogs();

        const malabeData = sensorLogs.map(entry => {
            const malabe = entry.data.Sensors.Malabe;
            
            return {
                id: entry.id,
                rain: malabe.rain,
                security: malabe.security,
                temperature: malabe.temp,
                soilMoisture: malabe.soilMoisture || 0, // Use default value if not present
                ph: malabe.ph,
                humidity: malabe.humidity,
                light: malabe.ldr,
                devices: {
                    waterPump: malabe.Devices.waterPump,
                    fertilizerSpray: malabe.Devices.fertilizerSpray
                },
                tankWaterLevel: malabe.tankWaterLevel
            };
        });

        // Send the filtered and formatted Malabe data as JSON response
        res.status(200).json(malabeData);
    } catch (error) {
        // Handle any errors that occur during processing
        res.status(500).json({ error: 'Failed to retrieve Malabe data' });
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