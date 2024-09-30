import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let DiseaseService = {};

// Add disease data to firestore
DiseaseService.addDiseaseData = async (data) => {
  try {
    let docRef = firestore.collection("Diseases").doc(Date.now().toString());
    await docRef.set(data);
  } catch (error) {
    console.error("Error saving disease data to firestore : ", error);
    throw error;
  }
};

// Get disease data from firestore
DiseaseService.getDiseaseData = async () => {
  try {
    const snapshot = await firestore.collection("Diseases").get();
    let diseasesData = [];
    snapshot.forEach((doc) => {
      diseasesData.push(doc.data());
    });
    return diseasesData;
  } catch (error) {
    console.error("Error getting disease data from firestore : ", error);
    throw error;
  }
};

// Delete disease data from firestore
DiseaseService.deleteDiseaseData = async (id) => {
  try {
    await firestore.collection("Diseases").doc(id).delete();
  } catch (error) {
    console.error("Error deleting disease data from firestore : ", error);
    throw error;
  }
};

// Update disease data in firestore
DiseaseService.updateDiseaseData = async (id, data) => {
  try {
    await firestore.collection("Diseases").doc(id).update(data);
  } catch (error) {
    console.error("Error updating disease data in firestore : ", error);
    throw error;
  }
};

// Get disease data with specific id from firestore
DiseaseService.getDiseaseDataById = async (id) => {
  try {
    const doc = await firestore.collection("Diseases").doc(id).get();
    return doc.data();
  } catch (error) {
    console.error("Error getting disease data by id from firestore : ", error);
    throw error;
  }
};

export default DiseaseService;