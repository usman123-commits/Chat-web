import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios.js"
import toast from "react-hot-toast";


// 1️⃣ Async function for checking auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/check");
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
    try {
      const res = await axiosInstance.post("/auth/signup",formData);
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
    try {
      const res = await axiosInstance.post("/auth/login",formData);
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
  async ( thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      return res.data; // this becomes action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);