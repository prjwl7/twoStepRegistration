import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/reducer.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
