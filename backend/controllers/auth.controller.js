import { auth } from "../config/firebase.config.js";

let AuthController = {};

AuthController.authenticateUser = async (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  auth.createSessionCookie(idToken, { expiresIn }).then(
    (sessionCookie) => {
      // Set cookie policy for session cookie.
      const options = { maxAge: expiresIn, httpOnly: true, secure: true };
      res.cookie("session", sessionCookie, options);
      res.end(JSON.stringify({ status: "success" }));
    },
    (error) => {
      console.log(error);
      res.status(401).send("UNAUTHORIZED REQUEST!");
    }
  );
};

export default AuthController;
