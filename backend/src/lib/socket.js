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

const allOnlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("A user connected", socket.id);

  // ✅ If same user connects again, remove old one first
  if (allOnlineUsers.has(userId)) {
    const oldSocketId = allOnlineUsers.get(userId);
    io.sockets.sockets.get(oldSocketId)?.disconnect(true);
  }

  allOnlineUsers.set(userId, socket.id);
  io.emit("getOnlineUsers", Array.from(allOnlineUsers.keys()));

  socket.on("disconnect", () => {
    allOnlineUsers.delete(userId);
    io.emit("getOnlineUsers", Array.from(allOnlineUsers.keys()));
    console.log("A user disconnected", socket.id);
  });
});

export { io,server,app}