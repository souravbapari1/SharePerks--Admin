export interface CommotionData {
  _id: string;
  amount: number;
  transitions_id: string;
  status: string;
  subtitle: string;
  title: string;
  type: string;
  completePayment: boolean;
  user: string;
  brand: string;
  typeDocId: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brandData: BrandData;
  userData: UserData;
}

export interface Data {
  provider_id: string;
  amount: number;
  commission: number;
  status: string;
  currency: string;
  store_name: string;
  userId: string;
  provider: string;
  type: string;
  typeId: string;
  data: Data2;
  date: string;
  response: Response;
}

export interface Data2 {
  name: string;
  userId: string;
  type: string;
  docId: string;
  brand: string;
  stock: string;
}

export interface Response {
  id: number;
  aff_sub: string;
  referrer_url: string;
  sale_amount: number;
  currency: string;
  user_commission: number;
  status: string;
  store_name: string;
  campaign_id: number;
  transaction_date: string;
  extra_info: string;
  pub_affiliate_id: any;
  subid1: string;
  subid2: string;
  subid3: string;
  subid4: string;
  subid5: string;
}

export interface BrandData {
  _id: string;
  name: string;
  btnText: string;
  linkUrl: string;
  category: string[];
  clicks: number;
  isActive: boolean;
  provider: string;
  stockISIN: string;
  offerTerms: OfferTerm[];
  cashBackRates: CashBackRate[];
  aboutBrand: string;
  bannerImage: string;
  brandImage: string;
  discountHighLights: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OfferTerm {
  title: string;
  content: string[];
}

export interface CashBackRate {
  type: string;
  value: string;
  title: string;
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
}
