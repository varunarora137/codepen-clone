import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/User";
import projectsReducer from "./Slices/Projects";
import searchReducer from "./Slices/search";

const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    searchTerm: searchReducer,
    // projects: projectsReducer,
  },
});

export default store;
