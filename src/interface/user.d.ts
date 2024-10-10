export interface UserProfileInfo {
  _id: string;
  referCode: string;
  image: string;
  mobile: number;
  walletAmount: number;
  completeProfile: boolean;
  brokerConnected: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  email: string;
  name: string;
}

export interface UserProfileFullData {
  user: UserProfileInfo;
  banks: Bank[];
  holdings: Holding;
  logs: Log[];
  payouts: Payout[];
}

export interface Bank {
  _id: string;
  name: string;
  accountNumber: string;
  user: string;
  ifscCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Holding {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  data: any;
  updatedAt: string;
}

export interface Data {
  demo: boolean;
}

export interface Log {
  _id: string;
  title: string;
  type: string;
  description: string;
  user: string;
  data: Data2;
  timeQuery: TimeQuery;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Data2 {
  referCode?: string;
  image?: string;
  mobile?: number;
  walletAmount?: number;
  completeProfile?: boolean;
  brokerConnected?: boolean;
  role?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  email?: string;
  name?: string;
  accountNumber?: string;
  user?: string;
  ifscCode?: string;
  bank?: string;
  amount?: number;
  data?: Data3;
}

export interface Data3 {
  demo: boolean;
}

export interface TimeQuery {
  dayName: DayName;
  monthName: MonthName;
  dayOfMonth: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
  ampm: string;
  timeZone: string;
}

export interface DayName {
  full: string;
  short: string;
}

export interface MonthName {
  full: string;
  short: string;
}

export interface Payout {
  _id: string;
  amount: number;
  status: string;
  user: string;
  bank: Bank2;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Bank2 {
  _id: string;
  name: string;
  accountNumber: string;
  user: string;
  ifscCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
