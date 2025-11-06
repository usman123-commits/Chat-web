import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectTomongo } from "./lib/mongoose.lib.js";
import cors from "cors";
import path from "path"
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
// for environment variables
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.Port;
const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});