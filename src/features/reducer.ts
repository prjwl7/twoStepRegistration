// reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStep, setUserField, setStep2Data, addSubmittedUser } from "./actions.ts";
import { User } from "./types.ts";

export interface Step2FormData {
  Address?: string;
  State?: string;
  City?: string;
  Country?: string;
  Pincode?: string;
}

export interface AppState {
  step: number;
  user: User;
  step2: Step2FormData;
  submittedUsers: User[];
  submittedUsersStep2: User[];
}

const initialStep2FormData: Step2FormData = {
  Address: "",
  State: "",
  City: "",
  Country: "",
  Pincode: "",
};

const initialState: AppState = {
  step: 1,
  user: {
    Name: "",
    Age: "",
    Sex: "",
    Mobile: "",
    GovtIdType: "",
    GovtId: "",
  },
  step2: initialStep2FormData,
  submittedUsers: [],
  submittedUsersStep2: [],
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
      })
      .addCase(setStep2Data, (state, action) => {
        state.step2 = { ...state.step2, ...action.payload };
      })
      .addCase(addSubmittedUser, (state, action) => {
        if (state.step === 1) {
          state.submittedUsers = [...state.submittedUsers, action.payload];
        } else if (state.step === 2) {
          state.submittedUsersStep2 = [...state.submittedUsersStep2, action.payload];
        }
      
        console.log("State after adding submitted user:", state);
      });
  },
});

export default userSlice.reducer;
