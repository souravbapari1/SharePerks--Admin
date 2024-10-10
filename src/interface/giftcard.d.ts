export interface GiftCardData {
  _id: string;
  storeType: string;
  codeType: string;
  brandId: string;
  denominationList: string;
  isEnable: boolean;
  stockISIN: string;
  description: string;
  taq: string;
  redeemSteps: string;
  GiftCardImage: string;
  OnlineRedemptionUrl: string;
  data: Data;
  inStockPercent: number;
  withoutStockPercent: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brand: Brand;
}

export interface Data {
  BrandProductCode: string;
  BrandName: string;
  Brandtype: string;
  RedemptionType: any;
  OnlineRedemptionUrl: any;
  BrandImage: any;
  denominationList: string;
  stockAvailable: string;
  Category: string;
  Descriptions: any;
  tnc: string;
  importantInstruction: any;
  redeemSteps: any;
  updated_at: string;
}

export interface Brand {
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
