export interface AdminUser {
  status: boolean;
  token: string;
  user: User;
}

export interface User {
  _id?: string;
  name?: string;
  image?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UpdatedAdmin {
  status: boolean;
  message: string;
  user: User;
  data: Data;
}

export interface Data {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: any;
  upsertedCount: number;
  matchedCount: number;
}
