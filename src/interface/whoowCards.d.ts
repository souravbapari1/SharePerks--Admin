export interface WhoowCard {
  _id: string;
  brandId: string;
  description: string;
  pricing: Pricing[];
  taq: string;
  isEnable: boolean;
  stockISIN: string;
  GiftCardImage: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  previewImage: string;
  brandName: string;
}

export interface Pricing {
  amount: number;
  withBroker: number;
  withOutBroker: number;
}

export interface Data {
  sku: string;
  name: string;
  currency: Currency;
  url: string;
  offerShortDesc: any;
  relatedProductOptions: RelatedProductOptions;
  minPrice: string;
  maxPrice: string;
  price: Price;
  discounts: any[];
  couponcodeDesc: any;
  images: Images;
  createdAt: string;
  updatedAt: string;
  campaigns: any;
}

export interface Currency {
  code: string;
  symbol: string;
  numericCode: string;
}

export interface RelatedProductOptions {
  PROMO: boolean;
  DESIGNS: boolean;
}

export interface Price {
  cpg: any[];
}

export interface Images {
  thumbnail: string;
  mobile: string;
  base: string;
  small: string;
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
