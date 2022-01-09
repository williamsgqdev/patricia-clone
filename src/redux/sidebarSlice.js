import { createSlice } from "@reduxjs/toolkit";

// Create Sidebar Slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpened: true,
  },
  reducers: {
    close: (state) => {
      state.isOpened = false;
    },
    open: (state) => {
      state.isOpened = true;
    },
  },
});

//export Action for each reducer case
export const { close, open } = sidebarSlice.actions;

export default sidebarSlice.reducer;
