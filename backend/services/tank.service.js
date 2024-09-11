import { database, firestore } from "../config/firebase.config.js";
import { ref, child, get } from "firebase/database";

const tankService = {};

//add tank data to firestore
tankService.addTank = async (data) => {
  try {
    let docRef = firestore.collection("tanks").doc();
    await docRef.set(data);
  } catch (error) {
    console.error("Error adding tank: ", error);
    throw error;
  }
};

//get all tanks from firestore
tankService.getTanks = async () => {
  try {
    let tanks = [];
    const tankRef = firestore.collection("tanks");
    const snapshot = await tankRef.get();
    snapshot.forEach(doc => {
      tanks.push({
        id: doc.id,
        data: doc.data()
      });
    });
    return tanks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default tankService;
