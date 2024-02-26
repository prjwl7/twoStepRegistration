import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types.ts";
import { setStep, setUserField } from "./actions.ts";

const initialState: { step: number; user: User } = {
  step: 1,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      state: "",
      city: "",
      country: "",
      postalCode: "",
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setStep, (state, action) => {
        state.step = action.payload;
      })
      .addCase(setUserField, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export default userSlice.reducer;
