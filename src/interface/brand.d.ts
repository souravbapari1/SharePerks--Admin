export interface BrandData {
  _id?: string;
  name: string;
  btnText: string;
  linkUrl: string;
  category: any;
  clicks?: number;
  isActive: boolean;
  provider: string;
  stockISIN: { label: string; value: string };
  offerTerms: OfferTerm[];
  cashBackRates: CashBackRate[];
  aboutBrand: string;
  bannerImage?: any;
  brandImage?: any;
  discountHighLights: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  categoryData?: CategoryData[];
}

export interface OfferTerm {
  content: string[];
  title: string;
}

export interface CashBackRate {
  title: string;
  value: number | string;
  type: "percent" | "amount";
}

export interface CategoryData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
