import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No authentication token, access denied." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found, access denied." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token, access denied." });
  }
};

export default authenticate;
