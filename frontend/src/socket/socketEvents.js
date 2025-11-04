import { getSocket } from "./socketClient.js";
import store from "../redux-Store/store.js";
import { setOnlineUsers } from "../slices/auth/slice.auth.js";

export const registerSocketEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  socket.on("getOnlineUsers", (userIds) => {
    console.log("🟢 Online Users Updated:", userIds);
    store.dispatch(setOnlineUsers(userIds));
  });

  
};
