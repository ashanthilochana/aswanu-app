import { auth } from "../config/firebase.config.js";

const verifyToken = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || "";
    // Verify the session cookie and check if the session was revoked
    await auth.verifySessionCookie(sessionCookie, true /* checkRevoked */);
    next();
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    
    // Send 401 Unauthorized response
    return res.status(401).send({ message: "Unauthorized. Please log in again." });
  }
};

export default verifyToken;
