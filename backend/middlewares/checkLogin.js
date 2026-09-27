import { getUser } from "../services/authService.js";

// 1. User Authentication Check Middleware
export function checkUserLogin(req, res, next) {
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

    req.user = user; // { id: user._id, role: user.role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized access",
    });
  }
}

