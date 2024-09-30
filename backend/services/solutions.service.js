import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

let SolutionsService = {};

// Add solution data to firestore
SolutionsService.addSolutionsData = async (data) => {
    try {
      let docRef = firestore.collection("Solutions").doc(Date.now().toString());
      await docRef.set(data);
    } catch (error) {
      console.error("Error saving sesnor data to firestore : ", error);
      throw error;
    }
  };

// Get solution data from firestore
SolutionsService.getSolutionsData = async () => {
    try {
      const snapshot = await firestore.collection("Solutions").get();
      let solutionsData = [];
      snapshot.forEach((doc) => {
        solutionsData.push(doc.data());
      });
      return solutionsData;
    } catch (error) {
      console.error("Error getting sensor data from firestore : ", error);
      throw error;
    }
  };

// Get solution data by solutionId
SolutionsService.getSolutionsDataById = async (solutionId) => {
    try {
      const snapshot = await firestore.collection("Solutions").where("solutionId", "==", solutionId).get();
      let solutionsData = [];
      snapshot.forEach((doc) => {
        solutionsData.push(doc.data());
      });
      return solutionsData;
    } catch (error) {
      console.error("Error getting sensor data from firestore : ", error);
      throw error;
    }
  };

// get solution data by solutionName
SolutionsService.getSolutionsDataByName = async (solutionName) => {
    try {
      const snapshot = await firestore.collection("Solutions").where("solutionName", "==", solutionName).get();
      let solutionsData = [];
      snapshot.forEach((doc) => {
        solutionsData.push(doc.data());
      });
      return solutionsData;
    } catch (error) {
      console.error("Error getting sensor data from firestore : ", error);
      throw error;
    }
  };


// Delete solution by solutionName
SolutionsService.deleteSolutionsDataByName = async (solutionName) => {
    try {
      const snapshot = await firestore.collection("Solutions").where("solutionName", "==", solutionName).get();
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    } catch (error) {
      console.error("Error getting sensor data from firestore : ", error);
      throw error;
    }
  };


// Update solution data by solutionName
SolutionsService.updateSolutionsDataByName = async (solutionName, data) => {
    try {
      const snapshot = await firestore.collection("Solutions").where("solutionName", "==", solutionName).get();
      snapshot.forEach((doc) => {
        doc.ref.update(data);
      });
    } catch (error) {
      console.error("Error getting sensor data from firestore : ", error);
      throw error;
    }
  };

export default SolutionsService;