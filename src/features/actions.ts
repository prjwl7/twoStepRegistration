import { createAction } from "@reduxjs/toolkit";
import {User} from './types.ts'
export const setStep = createAction<number>("user/setStep");
export const setUserField = createAction<Partial<User>>("user/setUserField");
