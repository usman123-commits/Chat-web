import jwt from "jsonwebtoken";
// for environment variables
import dotenv from "dotenv";
dotenv.config();
// secret key for signing the token
const JWT_SECRET = process.env.JWT_SECRET;
// function to generate a token
// user is the userid and res is the response object
export const generateToken = (user, res) => {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, 
    {
    httpOnly: true,//JavaScript on the frontend cannot access this cookie (prevents XSS attacks)
    samesite: "strict",//Cookie is sent only to your own site (prevents CSRF attacks)
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",//Cookie sent only over HTTPS in production
  });
  return token;
};
