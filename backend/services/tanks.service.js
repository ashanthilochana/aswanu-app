import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let TankService = {};

// Add sensor data to firestore
TankService.addTanksData = async (data) => {
    try {
      let docRef = firestore.collection("PhysicalTanks").doc(Date.now().toString());
      await docRef.set(data);
    } catch (error) {
      console.error("Error saving tank data to firestore : ", error);
      throw error;
    }
  };

  // Get tank data from firestore
TankService.getTanksData = async () => {
    try {
      const snapshot = await firestore.collection("PhysicalTanks").get();
      let tanksData = [];
      snapshot.forEach((doc) => {
        tanksData.push(doc.data());
      });
      return tanksData;
    } catch (error) {
      console.error("Error getting tank data from firestore : ", error);
      throw error;
    }
  };


export default TankService;