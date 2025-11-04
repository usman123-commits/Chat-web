import { io } from "socket.io-client";

let socket = null;

export const connectSocketClient = (baseUrl, authUser) => {
  if (!socket) {
    socket = io(baseUrl, {
      query: { userId: authUser._id },
    });

    console.log("🔌 Socket connected:", socket.id);
  }
  return socket;
};

export const disconnectSocketClient = () => {
  if (socket) {
    socket.disconnect();
    console.log("❌ Socket disconnected:", socket.id);
    socket = null;
  }
};

export const getSocket = () => socket;
