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

  // Delete tank data from firestore
TankService.deleteTanksData = async (id) => {
  try {
    await firestore.collection("PhysicalTanks").doc(id).delete();
  } catch (error) {
    console.error("Error deleting tank data from firestore : ", error);
    throw error;
    }
  };

// Update tank data in firestore
TankService.updateTanksData = async (id, data) => {
  try {
    await firestore.collection("PhysicalTanks").doc(id).update(data);
  } catch (error) {
    console.error("Error updating tank data in firestore : ", error);
    throw error;
  }
};

// Get tank data with specific id from firestore
TankService.getTanksDataById = async (id) => {
  try {
    const doc = await firestore.collection("PhysicalTanks").doc(id).get();
    return doc.data();
  } catch (error) {
    console.error("Error getting tank data by id from firestore : ", error);
    throw error;
  }
};


export default TankService;