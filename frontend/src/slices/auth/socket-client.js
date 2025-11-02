import { io } from "socket.io-client";

let socket = null;

export const connectSocketClient = (baseUrl, authUser) => {
  if (!authUser || socket?.connected) return;
  socket = io(baseUrl, {
    query: {
      userId: authUser._id,
    },
  });
  socket.on("connect", () => {
    console.log("✅ Socket connected successfully with ID:", socket.id);
  });
  socket.connect();
  console.log("connected to socket");
  return socket;
};

export const disconnectSocketClient = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }

  console.log("disconnected to socket");
};

export const getSocket = () => socket;
