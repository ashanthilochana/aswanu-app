import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let RiceVariationService = {};

// add rice variation data
RiceVariationService.addRiceVariationData = async (data) => {
    try {
      let docRef = firestore.collection("RiceVariation").doc(Date.now().toString());
      await docRef.set(data);
    } catch (error) {
      console.error("Error saving rice variation data to firestore : ", error);
      throw error;
    }
  };

export default RiceVariationService;