import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "searchTerm",
  initialState: {
    search: "",
  },
  reducers: {
    SET_SEARCH_TERM: (state, action) => {
      state.search = action.payload;
    },
    SET_SEARCH_TERM_EMPTY: (state) => {
      state.search = "";
    },
  },
});

export const { SET_SEARCH_TERM, SET_SEARCH_TERM_EMPTY } = search.actions;
export default search.reducer;
