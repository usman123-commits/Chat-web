import { createSlice } from "@reduxjs/toolkit";
import { getUsers,sendMessage } from "../chat/slice.chatData.thunk.js";
import toast from "react-hot-toast"
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
    setSelectedUser:(state,action)=>{
      const user = action.payload;
      state.selectedUser=user;
    }
  },
  extraReducers: (builder) => {
    builder
    // For getting all the users expect me 
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state,action) => {
        state.users=action.payload
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })


      // For sending messages 
      .addCase(sendMessage.pending, (state) => {
        // state.isUsersLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        // state.isUsersLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        // state.isUsersLoading = false;
      })
  },
});
export const {setSelectedUser} = sliceChatdata.actions;
export default sliceChatdata.reducer;
