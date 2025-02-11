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
  offerTerms: string;
  cashBackRates: string;

  commissionRate: number;
  commissionRateWithHolding: number;
  commissionType: "PERCENT" | "AMOUNT";

  aboutBrand: string;
  bannerImage?: any;
  brandImage?: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  categoryData?: CategoryData[];
}

export interface CategoryData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
