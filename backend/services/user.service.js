import { auth, firestore } from "../config/firebase.config.js";
import { userConverter } from "../models/user.model.js";

let UserService = {};

// Add user
UserService.addUser = async (user, email, password) => {
  let authUser = null;
  try {
    authUser = await saveUserAuthenticationData(email, password);
    await saveUserToFirestore(user);
    return user;  
  } catch (error) {
    console.error("Error occurred during user creation process:", error);
    if (authUser) {
      await deleteUserFromAuthentication(authUser.uid);
    }
    throw error;
  }
};

// Add user to firestore
async function saveUserToFirestore(user) {
  let docRef = firestore.collection('users').doc(user.email).withConverter(userConverter);
  await docRef.set(user);
}

// Delete user from firestore
async function deleteUserFromFirestore(email) {
  let docRef = firestore.collection('users').doc(email);
  await docRef.delete();
}

// Save user 
async function saveUserAuthenticationData(email, password) {
  const userRecord = await auth.createUser({
    email: email,
    password: password,
  });
  return userRecord;
}

// Delete user from authentication
async function deleteUserFromAuthentication(uid) {
  await auth.deleteUser(uid);
}


export default UserService;
