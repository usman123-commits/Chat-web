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
// it contains the socketIds and userIds of all online users
const allOnlineUsers = new Map();
// it is used to find the socketId of a particular user
export function getReceiverSocketId(userId) {
  const socketID = allOnlineUsers.get(userId);
  return socketID;
}

// this function runs every time a user is connected 
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("A user connected", socket.id);

  // ✅ If same user connects again, remove old one first
  if (allOnlineUsers.has(userId)) {
    const oldSocketId = allOnlineUsers.get(userId);
    io.sockets.sockets.get(oldSocketId)?.disconnect(true);
  }
// now adding a user in allOnlineUsers 
  allOnlineUsers.set(userId, socket.id);

// sending the the userIds of all online users to frontend
  io.emit("getOnlineUsers", Array.from(allOnlineUsers.keys()));

// this function runs everytime a user is disconnected
  socket.on("disconnect", () => {
    // delete the user from allOnlineUsers
    allOnlineUsers.delete(userId);
    io.emit("getOnlineUsers", Array.from(allOnlineUsers.keys()));
    console.log("A user disconnected", socket.id);
  });
});

export { io, server, app };
