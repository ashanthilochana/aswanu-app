import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let RiceVariationService = {};

// Add sensor data to Firestore using custom sID as the document ID
RiceVariationService.addRiceVariationData = async (data) => {
  try {
    // Step 1: Get the current rice variations to determine the highest sID
    const snapshot = await firestore.collection("RiceVariation").orderBy("vID", "desc").limit(1).get();
    
    let newVID;
    if (!snapshot.empty) {
      // Step 2: Extract the highest sID and generate the next sID
      const lastVariation = snapshot.docs[0].data();
      const lastSID = lastVariation.sID;

      // Extract the numeric part of the last sID (e.g., from "S001" get 1)
      const numericPart = parseInt(lastSID.slice(1)) + 1;
      
      // Create the new sID (e.g., "S002", "S003", etc.)
      newVID = `S${String(numericPart).padStart(3, "0")}`;
    } else {
      // If there are no existing documents, start from "S001"
      newVID = "V001";
    }

    // Step 3: Add the new sID to the data
    data.vID = newVID;

    // Step 4: Use the new sID as the document ID in Firestore
    await firestore.collection("RiceVariation").doc(newVID).set(data);

    console.log("Document written with vID: ", newVID);
    return newVID; // Return the newly created sID
  } catch (error) {
    console.error("Error saving rice variation data to Firestore: ", error);
    throw error;
  }
};


  // get rice variation data from firestore
RiceVariationService.getRiceVariationData = async () => {
    try {
      const snapshot = await firestore.collection("RiceVariation").get();
      let riceVariationData = [];
      snapshot.forEach((doc) => {
        riceVariationData.push(doc.data());
      });
      return riceVariationData;
    } catch (error) {
      console.error("Error getting rice variation data from firestore : ", error);
      throw error;
    }
  };

// Delete variation data from firestore
RiceVariationService.deleteRiceVariationData = async (id) => {
  try {
    await firestore.collection("RiceVariation").doc(id).delete();
    console.log("Document deleted with id: ", id);
  } catch (error) {
    console.error("Error deleting rice variation data from Firestore: ", error);
    throw error;
  }
};


// Update variation data in firestore
RiceVariationService.updateRiceVariationData = async (id, data) => {
  try {
    await firestore.collection("RiceVariation").doc(id).update(data);
    console.log("Document updated with id: ", id);
    return id;
  } catch (error) {
    console.error("Error updating rice variation data in Firestore: ", error);
    throw error;
  }
};

// Get variation data with specific id from firestore
RiceVariationService.getRiceVariationDataById = async (id
) => {
  try {
    const doc = await firestore.collection("RiceVariation").doc(id).get();
    return doc.data();
  } catch (error) {
    console.error("Error getting rice variation data from Firestore: ", error);
    throw error;
  }
};
  

export default RiceVariationService;


