export interface GiftCardOrder {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  totalOrders: number;
}

export interface Order {
  _id: string;
  user: string;
  amount: number;
  provider: string;
  paymentID: string;
  name: string;
  payAmount: number;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userObjectId: string;
  userData: UserData;
  gifterResponse?: GifterResponse;
  orderID?: string;
}

export interface UserData {
  _id: string;
  referCode: string;
  image: string;
  referPaymentComplete: boolean;
  mobile: number;
  walletAmount: number;
  completeProfile: boolean;
  brokerConnected: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  expOtp: any;
  otp: any;
  email: string;
  name: string;
  emailAlerts?: boolean;
}

export interface GifterResponse {
  PullVouchers: PullVoucher[];
  ErrorCode: string;
  ErrorMessage: string;
  ExternalOrderIdOut: string;
  Message: string;
  ResultType: string;
  BrandProductCode: string;
}

export interface PullVoucher {
  Vouchers: Voucher[];
  ProductGuid: string;
  ProductName: string;
  VoucherName: string;
}

export interface Voucher {
  VoucherNo: string;
  VoucherGuid: string;
  EndDate: string;
  Value: string;
  Voucherpin: string;
  VoucherGCcode: string;
}
