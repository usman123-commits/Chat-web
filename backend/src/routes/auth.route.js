import express from "express";
import { login, logout, signUp } from "../controller/auth.controller.js";
import { body,validationResult } from "express-validator";
const router = express.Router();
// For login
router.post("/login", login);
// For signup
router.post("/signup", signUp);
// For logout
router.post("/logout", logout);

export default router;
