import { createAction } from "@reduxjs/toolkit";
import {User} from './types.ts'
import {Step2FormData} from './reducer.ts'
export const setStep = createAction<number>("user/setStep");
export const setUserField = createAction<Partial<User>>("user/setUserField");
export const setStep2Data = createAction<Step2FormData>("user/setStep2Data");
export const addSubmittedUser = createAction<User>("user/addSubmittedUser");