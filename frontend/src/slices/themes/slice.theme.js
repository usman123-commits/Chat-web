import { createSlice } from "@reduxjs/toolkit";

export const sliceTheme = createSlice({
  name: "Theme",
  initialState: { theme: localStorage.getItem("chat-theme") || "coffee" },
  reducers: {
    setTheme:(state,action)=>{
      const theme = action.payload;
      localStorage.setItem("chat-theme",theme)
      state.theme=theme
    }
  },
});
export const {setTheme} = sliceTheme.actions;
export default sliceTheme.reducer;
