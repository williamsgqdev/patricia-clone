import { createSlice } from "@reduxjs/toolkit";

// Create transactions Slice
const transactionsSlice = createSlice({
  name: "sidebar",
  initialState: {
      transactions : []
  },
  reducers: {
    setTransaction: (state , action) => {
      state.transactions = action.payload;
    }
  },
});

//export Action for each reducer case
export const {setTransaction} = transactionsSlice.actions;

export default transactionsSlice.reducer;
