import { getUser } from "../services/auth.js";

function checkUserLogin(req, res, next) {
  try {
    const userToken = req.cookies?.uid;

    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found. Please login.",
      });
    }

    const user = getUser(userToken);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized access",
    });
  }
}


export default checkUserLogin