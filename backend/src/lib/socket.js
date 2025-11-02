import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
// in this we are going to built server instance by http then pass it to socket server
// both socket and express run on same port and don't mess with each other
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
  },
});

io.on("connection",(socket)=>{
    console.log("A user connected ",socket.id)
    socket.on("disconnect",()=>{
        console.log("A user disconnected ",socket.id);
    })
})

export { io,server,app}