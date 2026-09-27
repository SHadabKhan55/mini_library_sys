import jwt from "jsonwebtoken";

export function setUser(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY || "fallback_secret_key",
    { expiresIn: "7d" }
  );
}

export function getUser(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY || "fallback_secret_key");
  } catch (error) {
    throw new Error(`Verification failed: ${error.message}`);
  }
}