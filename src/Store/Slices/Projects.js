import { createSlice } from "@reduxjs/toolkit";

const projects = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    SET_PROJECTS: (state, action) => {
      state.projects = action.payload;
    },
    SET_PROJECTS_NULL: (state) => {
      state.projects = [];
    },
  },
});

export const { SET_PROJECTS, SET_PROJECTS_NULL } = projects.actions;
export default projects.reducer;
