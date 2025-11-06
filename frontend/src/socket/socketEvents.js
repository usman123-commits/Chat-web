import { getSocket } from "./socketClient.js";
import store from "../redux-Store/store.js";
import { setOnlineUsers } from "../slices/auth/slice.auth.js";
import { updateMessages } from "../slices/chat/slice.chatData.js";
import { useSelector } from "react-redux";
export const registerSocketEvents = () => {
  // get the socket instance to make event listeners
  const socket = getSocket();
  // if there is no socket means no socket connection then return
  if (!socket) return;
  // if there are following event listner listening already then off them to avoid multiple executions
  socket.off("getOnlineUsers");
  socket.off("messages");

  // this is the eventlistener to get online users
  socket.on("getOnlineUsers", (userIds) => {
    console.log("🟢 Online Users Updated:", userIds);
    store.dispatch(setOnlineUsers(userIds));
  });
  // this is the eventlistner to get new messages
  socket.on("messages", (message) => {
    const state = store.getState();
    const selectedUser = state.chat.selectedUser;

    if (selectedUser?._id === message.senderId) {
      store.dispatch(updateMessages(message));
    }
  });
};
