import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let TankService = {};

// Add sensor data to Firestore using custom tID as the document ID
TankService.addTanksData = async (data) => {
  try {
    // Step 1: Get the current tanks to determine the highest tID
    const snapshot = await firestore.collection("PhysicalTanks").orderBy("tID", "desc").limit(1).get();
    
    let newTID;
    if (!snapshot.empty) {
      // Step 2: Extract the highest tID and generate the next tID
      const lastTank = snapshot.docs[0].data();
      const lastTID = lastTank.tID;

      // Extract the numeric part of the last tID (e.g., from "T001" get 1)
      const numericPart = parseInt(lastTID.slice(1)) + 1;
      
      // Create the new tID (e.g., "T002", "T003", etc.)
      newTID = `T${String(numericPart).padStart(3, "0")}`;
    } else {
      // If there are no existing documents, start from "T001"
      newTID = "T001";
    }

    // Step 3: Add the new tID to the data
    data.tID = newTID;

    // Step 4: Use the new tID as the document ID in Firestore
    await firestore.collection("PhysicalTanks").doc(newTID).set(data);

    console.log("Document written with tID: ", newTID);
    return newTID; // Return the newly created tID
  } catch (error) {
    console.error("Error saving tank data to Firestore: ", error);
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
}


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