import { User } from "../models/user.model.js";
import UserService from "../services/user.service.js";

let UserController = {};

// Add a new user
UserController.addUser = async (req, res) => {
  try {
    let {
      email,
      password,
      firstName,
      lastName,
      role,
      phoneNo,
      region,
      district,
      address,
    } = req.body;
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !role ||
      !phoneNo ||
      !region ||
      !district ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required." });
    } else {
      let user = new User(
        firstName,
        lastName,
        email,
        role,
        phoneNo,
        new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}),
        region,
        district,
        address
      );
      try {
        let savedUser = await UserService.addUser(user, email, password);
        res.status(201).send(savedUser);
      } catch (error) {
        res
          .status(500)
          .send({
            message: "An Internal Server error occurred while signing up user",
          });
      }
    }
  } catch (error) {}
};

// Get all users
UserController.getAllUsers = async (req, res) => {
  try {
    let users = await UserService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An Internal Server error occurred while fetching users" });
  }
};

export default UserController;
