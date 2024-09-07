import UserService from "../service/user.service.js";

let UserController = {};

UserController.addUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if(!email || !password)
    {
        res.status(400).send({message : "Email or Password cannot be null"});
    }
    else
    {
        try {
            let user = await UserService.addUser(email, password);
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send({message : "An Internal Server error occurred while signing up user"});
        }
    }
  } catch (error) {}
};

export default UserController;
