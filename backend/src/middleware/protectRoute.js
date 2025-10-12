import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// for environment variables
import dotenv from "dotenv";
dotenv.config();
// secret key for signing the token
const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
  try {
    // access the token from cookies
    const token = req.cookies.jwt;
    // if token not found send 401 status with message "Not authorized, no token"
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    // verify the token by jwt.verify()
    const decoded = jwt.verify(token, JWT_SECRET);
    // if token is invalid send 401 status with message "Not authorized, token failed"
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    // if token is valid get the user from the database and attach it to the request object
    
    const user = await User.findById(decoded.user).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    // attach the user to the request object
    req.user = user;
    // call the next middleware
    next();
    
  } catch (error) {
    console.log("error in ProtectRoute middleware", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
