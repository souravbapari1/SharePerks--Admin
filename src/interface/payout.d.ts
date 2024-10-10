import { Bank, UserProfileFullData, UserProfileInfo } from "./user";

export interface PayoutData {
  _id: string;
  amount: number;
  status: string;
  user: string;
  bank: Bank;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userData?: UserProfileInfo;
}
