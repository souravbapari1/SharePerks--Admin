import { BrandData } from "@/interface/brand";
import { UserData } from "@/interface/commition";
import { OfferData } from "@/interface/offers";

export interface LogData {
  data: Daum[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Daum {
  _id: string;
  title: string;
  type: string;
  description: string;
  user: string;
  data: Data;
  timeQuery: TimeQuery;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userObjectId: string;
  userData: UserData;
}

export interface Data {
  link: string;
  offer?: OfferData;
  brand?: BrandData;
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
