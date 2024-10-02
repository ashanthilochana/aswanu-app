import cron from 'node-cron';
import SensorService from "../services/sensor.service.js";

export const scheduleCronJobs = () => {
  cron.schedule('1 */15 * * * *', async () => { // 15 min to log evert 15 min
    try {
      await SensorService.saveSensorData();
      console.log('Sensor data saved successfully.');
    } catch (error) {
      console.error('Error saving sensor data:', error);
    }
  });
};
