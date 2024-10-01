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





  

export default RiceVariationService;


