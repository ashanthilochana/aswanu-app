import { database, firestore} from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SensorService = {};

async function saveSensorDataToFirestore(data) {
  try {
    let docRef = firestore.collection('sensors').doc(Date.now().toString());
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
export default SensorService;
