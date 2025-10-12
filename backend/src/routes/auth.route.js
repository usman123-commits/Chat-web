import express from "express";
import { checkAuth, login, logout, signUp, updateProfile } from "../controller/auth.controller.js";
import { body,validationResult } from "express-validator";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
// For login
router.post("/signup"
    // Validation middlewares
    ,[
    body("fullName", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid name").isLength({ min: 6 }),
    body("email", "Please enter a valid email").isEmail(),
  ],
  // using the signup controller 
   signUp
  );

// For login
router.post("/login", login);


// For logout
router.post("/logout", logout);

// For updating profile
router.put("/updateProfile",protectRoute,updateProfile);
// Used when user refresh the page
router.get("/check",protectRoute,checkAuth);



export default router;
