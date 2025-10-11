import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/Student.js";

dotenv.config();




export const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", ""); // name must match what you set in res.cookie()

    if (!token) {
      return res.status(401).json({ message: "No token provided in cookies" });
    }

    // 2️⃣ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECREAT);

      const user = await Student.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // 3️⃣ Attach user info to request
    req.user = user; // decoded contains { id: student._id, email, iat, exp }

    // 4️⃣ Continue
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
