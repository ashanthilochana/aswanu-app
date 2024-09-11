import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SolutionsService = {};

// Add sensor data to firestore
SolutionsService.addSolutionsData = async (data) => {
    try {
      let docRef = firestore.collection("Solutions").doc(Date.now().toString());
      await docRef.set(data);
    } catch (error) {
      console.error("Error saving sesnor data to firestore : ", error);
      throw error;
    }
  };

export default SolutionsService;