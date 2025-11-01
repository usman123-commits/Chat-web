import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectTomongo } from "./lib/mongoose.lib.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// for environment variables
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.Port;

// app is the object of express that contain all the methods and other objects
const app = express();
// Middleware to extract data from the body of incoming requests and in form of JSON
app.use(express.json());
// to extract the cookies from the request
app.use(cookieParser());

// using cors to give frontend access to this backend apis
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:["GET", "POST", "PUT", "DELETE"]
  })
);

// connecting to mongoDB
connectTomongo();
// Routes with prefix api auth
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT} `);
});
