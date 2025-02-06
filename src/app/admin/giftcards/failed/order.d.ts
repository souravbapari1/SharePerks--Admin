import { UserProfileInfo } from "@/interface/user";
export interface OrderCouponsRoot {
  metadata: Metadata;
  data: OrderCoupons[];
}

export interface Metadata {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface OrderCoupons {
  retryCount: number;
  _id: string;
  user: string;
  amount: number;
  retry: boolean;
  refund: boolean;
  orderID?: string;
  paymentID: string;
  provider: string;
  errorResponse: ErrorResponse;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refundNote: string;
  data?: Data;
  userData: UserProfileInfo;
  resolved: boolean;
}

export interface ErrorResponse {
  code: any;
  message?: string;
  messages?: any[];
  status?: string;
  statusLabel?: string;
  statusImage: any;
  statusLevel: any;
  orderId?: string;
  refno?: string;
  cancel?: Cancel;
  data?: string;
  desc?: string;
}

export interface Cancel {
  allowed: boolean;
}

export interface Data {
  BrandProductCode: string;
  Denomination: number;
  Quantity: number;
  ExternalOrderId: string;
  user: string;
  paymentId: string;
}
