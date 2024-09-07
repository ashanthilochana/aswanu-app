import { auth } from "../config/firebase.config.js";

let UserService = {};

UserService.addUser = async (email, password) => {
    try {
        const userRecord = await auth.createUser({
          email: email,
          password: password,
        });
        return userRecord;
      } catch (error) {
        console.log("Error creating new user:", error);
        throw error;
      }
};


export default UserService;
