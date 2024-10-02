import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SolutionService = {};

// Add solution data to Firestore using custom sID as the document ID
SolutionService.addSolutionData = async (data) => {
  try {
    // Step 1: Get the current solutions to determine the highest sID
    const snapshot = await firestore.collection("Solutions").orderBy("sID", "desc").limit(1).get();
    
    let newSID;
    if (!snapshot.empty) {
      // Step 2: Extract the highest sID and generate the next sID
      const lastSolution = snapshot.docs[0].data();
      const lastSID = lastSolution.sID;

      // Extract the numeric part of the last sID (e.g., from "S001" get 1)
      const numericPart = parseInt(lastSID.slice(1)) + 1;
      
      // Create the new sID (e.g., "S002", "S003", etc.)
      newSID = `S${String(numericPart).padStart(3, "0")}`;
    } else {
      // If there are no existing documents, start from "S001"
      newSID = "S001";
    }

    // Step 3: Add the new sID to the data
    data.sID = newSID;

    // Step 4: Use the new sID as the document ID in Firestore
    await firestore.collection("Solutions").doc(newSID).set(data);

    console.log("Document written with sID: ", newSID);
    return newSID; // Return the newly created sID
  } catch (error) {
    console.error("Error saving solution data to Firestore: ", error);
    throw error;
  }
};


// Get all solution data from Firestore
SolutionService.getSolutionsData = async () => {
  try {
    const snapshot = await firestore.collection("Solutions").get();
    let solutionsData = [];
    snapshot.forEach((doc) => {
      solutionsData.push(doc.data());
    });
    return solutionsData;
  } catch (error) {
    console.error("Error getting solution data from Firestore: ", error);
    throw error;
  }
};

// Delete solution data from Firestore by sID
SolutionService.deleteSolutionData = async (id) => {
  try {
    await firestore.collection("Solutions").doc(id).delete();
    console.log(`Solution with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting solution data from Firestore: ", error);
    throw error;
  }
};

// Update solution data in Firestore
SolutionService.updateSolutionData = async (id, data) => {
  try {
    await firestore.collection("Solutions").doc(id).update(data);
    console.log(`Solution with ID ${id} updated successfully.`);
  } catch (error) {
    console.error("Error updating solution data in Firestore: ", error);
    throw error;
  }
};

// Get solution data with specific sID from Firestore
SolutionService.getSolutionDataById = async (id) => {
  try {
    const doc = await firestore.collection("Solutions").doc(id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.log(`No solution found with ID ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting solution data by ID from Firestore: ", error);
    throw error;
  }
};


export default SolutionService;