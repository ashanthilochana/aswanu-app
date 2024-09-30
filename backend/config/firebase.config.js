// Configuring firebase admin

// import admin from "firebase-admin";

// import serviceAccount from "../firebase/firebase-key.json" with {type: "json"};

// //using service acc to authenticate - change key and database url when changing project/databases
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://aswanu-app-default-rtdb.asia-southeast1.firebasedatabase.app"
//   });

import admin from "firebase-admin";

import serviceAccount from "../firebase/firebase-key.json" with {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aswanu-db-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const database = admin.database();

export const auth = admin.auth();

export const firestore = admin.firestore();


