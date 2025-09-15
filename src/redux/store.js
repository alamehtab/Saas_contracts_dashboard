import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import contractReducer from "./slice/contractsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contracts: contractReducer,
  },
});
