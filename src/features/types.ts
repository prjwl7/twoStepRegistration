// types.ts
export interface User {
  Name: string;
  Age: string;
  Sex: string;
  Mobile: string;
  GovtIdType: string;
  GovtId: string;
}

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
