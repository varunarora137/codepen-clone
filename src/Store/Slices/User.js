import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    SET_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    SET_USER_NULL: (state) => {
      state.currentUser = null;
    },
  },
});

export const { SET_USER, SET_USER_NULL } = users.actions;
export default users.reducer;
