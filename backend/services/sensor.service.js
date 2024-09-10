import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SensorService = {};

async function saveSensorDataToFirestore(data) {
  try {
    let docRef = firestore.collection("sensors").doc(Date.now().toString());
    await docRef.set(data);
  } catch (error) {
    console.error("Error saving sesnor data to firestore : ", error);
    throw error;
  }
}

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
