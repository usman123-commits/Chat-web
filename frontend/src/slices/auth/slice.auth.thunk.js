import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios.js";
import { connectsocket,disconnectsocket} from "./slice.auth.js"

// 1️⃣ Async function for checking auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    const { dispatch,getState} = thunkAPI;
    try {
      const res = await axiosInstance.get("/auth/check");
      dispatch(connectsocket())
      return res.data; // this becomes action.payload
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);


//  Async function for logging 
export const signUp = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "auth/signUp",
  async (formData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const res = await axiosInstance.post("/auth/signup",formData);
      dispatch(connectsocket())
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);


//  Async function for logging 
export const logIn = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "auth/logIn",
  async (formData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const res = await axiosInstance.post("/auth/login",formData);
      dispatch(connectsocket())
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  Async function for logging 
export const logOut = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "auth/logOut",
  async ( _,thunkAPI) => {
     const { dispatch } = thunkAPI;
    try {
      const res = await axiosInstance.post("/auth/logout");
      
      dispatch(disconnectsocket())
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  Async function for logging 
export const updateProfile = createAsyncThunk(
  // it is just a label. it must be unique it helps to avoid clashes
  "auth/updateProfile",
  async ( profilePic,thunkAPI) => {
    
    try {
      const res = await axiosInstance.put("/auth/updateProfile",profilePic);
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);