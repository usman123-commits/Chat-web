import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  logIn,
  logOut,
  signUp,
  updateProfile,
} from "./slice.auth.thunk.js";
import toast from "react-hot-toast";

// importing from vite's .env
const baseUrl = import.meta.env.VITE_BASE_URL;

export const sliceAuth = createSlice({
  name: "Auth",
  initialState: {
    // states used globally
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    isSocketConnected: false,
  },
  // reducers must be pure funcctions i cannot use async in them for async i have go towards createAsyncThunk
  reducers: {
    setOnlineUsers: (state, action) => {
      let newusers = action.payload;
      state.onlineUsers = [...newusers];
      
    }
  },
  //
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      // signup

      .addCase(signUp.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
        toast.success("You are signed up sucessfully");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSigningUp = false;
        state.authUser = null;
        toast.error("Something went wrong ");
      })

      // login
      .addCase(logIn.pending, (state, action) => {
        state.isLoggingIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
        toast.success("You are loginned sucessfully");
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = null;
        toast.error("Something went wrong ");
      })

      // Logout
      .addCase(logOut.fulfilled, (state) => {
        state.authUser = null;
        toast.success("Logout sucessfully");
      })

      // updateProfile

      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isUpdatingProfile = false;
        toast.success("Updated Profile Pic");
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
        toast.error("Something went wrong");
      });
  },
});

// we are exporting reducer functions and there actions from here
export const {  setOnlineUsers } =
  sliceAuth.actions;
export default sliceAuth.reducer;
