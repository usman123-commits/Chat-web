import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  sendMessage,
  loadingChat,
} from "../chat/slice.chatData.thunk.js";
import toast from "react-hot-toast";


export const sliceChatdata = createSlice({
  name: "Chatdata",
  initialState: {
    users: [],
    messages: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      const user = action.payload;
      state.selectedUser = user;
    },
  },
  extraReducers: (builder) => {
    builder
      // For getting all the messages of selected user
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })

      // For sending messages

      .addCase(loadingChat.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(loadingChat.fulfilled, (state, action) => {
        const newMessage = action.payload;
        state.messages = [...newMessage];
        
        state.isMessagesLoading = false;
      })
      .addCase(loadingChat.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      // For sending messages

      .addCase(sendMessage.pending, (state) => {
        // nothing
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // newMessage= message that we send
        const newMessage = action.payload;
        state.messages = [...state.messages, newMessage];
      })
      .addCase(sendMessage.rejected, (state) => {
        // nothing
      });
  },
});
export const { setSelectedUser } = sliceChatdata.actions;
export default sliceChatdata.reducer;
