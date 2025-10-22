import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios.js"


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
