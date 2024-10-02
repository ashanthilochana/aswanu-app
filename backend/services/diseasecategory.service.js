import { firestore } from "../config/firebase.config.js";

let DiseaseCategoryService = {};

// Add rice disease category data
DiseaseCategoryService.addDiseaseCategoryData = async (data) => {
  try {
    let docRef = firestore.collection("RiceDiseaseCategories").doc(Date.now().toString());
    await docRef.set(data);
  } catch (error) {
    console.error("Error saving rice disease category data to Firestore: ", error);
    throw error;
  }
};

// Get rice disease category data from Firestore
DiseaseCategoryService.getDiseaseCategoryData = async () => {
  try {
    const snapshot = await firestore.collection("RiceDiseaseCategories").get();
    let DiseaseCategoryData = [];
    snapshot.forEach((doc) => {
      DiseaseCategoryData.push({ id: doc.id, ...doc.data() }); // include the document id
    });
    return DiseaseCategoryData;
  } catch (error) {
    console.error("Error getting rice disease category data from Firestore: ", error);
    throw error;
  }
};

// Delete rice disease category data
DiseaseCategoryService.deleteDiseaseCategoryData = async (id) => {
  try {
    await firestore.collection("RiceDiseaseCategories").doc(id).delete();
  } catch (error) {
    console.error("Error deleting rice disease category data from Firestore: ", error);
    throw error;
  }
};


export default DiseaseCategoryService;
