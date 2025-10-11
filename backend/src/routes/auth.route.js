import express from "express";
import { login, logout, signUp } from "../controller/auth.controller.js";
import { body,validationResult } from "express-validator";
const router = express.Router();
// For login
router.post("/signup"
    // Validation middlewares
    ,[
    body("fullName", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid name").isLength({ min: 6 }),
    body("email", "Please enter a valid email").isEmail(),
  ],
   signUp);






// For logout
router.post("/logout", logout);

export default router;
