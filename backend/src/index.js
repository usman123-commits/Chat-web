import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectTomongo } from "./lib/mongoose.lib.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.Port;

// app is the object of express that contain all the methods and other objects
const app = express();
// Middleware to extract data from the body of incoming requests and in form of JSON
app.use(express.json());
// connecting to mongoDB
connectTomongo();
// Routes with prefix api auth
app.use("/api/auth", authRoutes);







app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT} `);
});
