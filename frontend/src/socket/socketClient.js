import { io } from "socket.io-client";

let socket = null;

// this function is to make socket connection with backend 
export const connectSocketClient = (baseUrl, authUser) => {
  // if there is already socket connected then only return that socket which is used to communicate with backend
  if (!socket) {
    socket = io(baseUrl, {
      query: { userId: authUser._id },
    }); 
   socket.on("connected",()=>{
    console.log("🔌 Socket connected:", socket.id);
   })
    
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
