import express from "express";
import { body } from "express-validator";
import { protectRoute } from "../middleware/protectRoute.js";
import { allUsers,getMessages,sendMessage } from "../controller/message.controller.js";
import { config } from "dotenv";
config();
const router = express.Router();    
// to find all the users except the logged in user
router.get("/allUsers",protectRoute,allUsers);

// find all the messages between two users
// :id is the id of the user we are chatting with
router.get("/:id",protectRoute,getMessages);

// for sending a message to a user 
router.post("/sendMessage/:id",protectRoute,sendMessage);

    

export default router;