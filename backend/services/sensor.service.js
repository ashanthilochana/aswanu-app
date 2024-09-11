import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SensorService = {};


// Turn on off devices
SensorService.updateDeviceStatus = async (deviceName, status) => {

  let path = 'Sensors/Malabe/Devices/' + deviceName;

  const ref = database.ref(path);

// Set the value of waterPump to true
ref.set(status)
  .then(() => {
    console.log('Data updated successfully!');
  })
  .catch((error) => {
    console.error('Error updating data:', error);
  });
}

// Save sensor data to firestore
async function saveSensorDataToFirestore(data) {
  try {
    let docRef = firestore.collection("sensors").doc(Date.now().toString());
    await docRef.set(data);
  } catch (error) {
    console.error("Error saving sesnor data to firestore : ", error);
    throw error;
  }
}

// Save sensor data to firestore
SensorService.saveSensorData = async () => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "/"));

    if (snapshot.exists()) {
      await saveSensorDataToFirestore(snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

// Get all sensor logs from firestore
SensorService.getAllSensorLogs = async () => {
  try {

    let sensorLogs = [];

    const sensorLogRef = firestore.collection("sensors");
    const snapshot = await sensorLogRef.get();
    snapshot.forEach(doc => {
      sensorLogs.push({
        id : doc.id,
        data : doc.data()
      });
    });
    return sensorLogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default SensorService;
