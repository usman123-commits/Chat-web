import express from "express";
import { body } from "express-validator";
import { protectRoute } from "../middleware/protectRoute.js";
import { allUsers } from "../controller/message.controller.js";
import { config } from "dotenv";
config();
const router = express.Router();    
// to find all the users except the logged in user
router.get("/allUsers",protectRoute,allUsers);

    

export default router;