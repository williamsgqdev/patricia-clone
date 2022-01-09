import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import transactionReducer from "./transactionsSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    transaction: transactionReducer,
  },
});
