import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "./slice.auth.thunk.js";
export const sliceAuth = createSlice({
  name: "Auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
  },
  // reducers must be pure funcctions i cannot use async in them for async i have go towards createAsyncThunk
  reducers: {

  },
  //
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = action.payload;
        state.authUser = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser=null;
        state.isCheckingAuth=false;
      });
  },
});

// we are exporting reducer functions and there actions from here
export const {  } = sliceAuth.actions;
export default sliceAuth.reducer;
