import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios.js"


//  Async function for getting al users to use in side bar 
export const getUsers = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "messages/getUsers",
  async ( _,thunkAPI) => {
    try {
      const res = await axiosInstance.get("/message/allUsers");
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  Async function for logging chat of selectedUser
export const loadingChat = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "messages/loadingChat",
  // user must be id
  async ( {id},thunkAPI) => {
    try {
      
      const res = await axiosInstance.get(`/message/${id}`);
    
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

// Remaining
export const sendMessage = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "messages/sendMessage",
  async ( {text,image},thunkAPI) => {
   
    // const senderId = state.auth.authUser.etc(i want to access authUser's id)
     const state = thunkAPI.getState();
     const senderId= state.chat.selectedUser._id
    try {
      const res = await axiosInstance.post(`/message/sendMessage/${senderId}`,{text,image});
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);
// subscribeToMessages


export const subscribeToMessages= () => {
    // const { selectedUser } = get();
    // if (!selectedUser) return;

    // const socket = useAuthStore.getState().socket;

    // socket.on("newMessage", (newMessage) => {
    //   const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    //   if (!isMessageSentFromSelectedUser) return;

    //   set({
    //     messages: [...get().messages, newMessage],
    //   });
    // });
  }


// unsubscribeFromMessage
 export const unsubscribeFromMessages= () => {
    // const socket = useAuthStore.getState().socket;
    // socket.off("newMessage");
  }



