export interface TCampaign {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  data: Campaign;
}
export interface Campaign {
  id: number;
  name: string;
  url: string;
  domain: string;
  payout_type: string;
  payout: number;
  image: string;
  additional_info?: string;
  additional_info_html?: string;
  important_info_html: string;
  last_modified: string;
  payout_categories: PayoutCategory[];
  categories?: Category[];
  countries: Country[];
  reporting_type: string;
  deeplink_allowed: boolean;
  sub_ids_allowed: boolean;
  cashback_publishers_allowed: boolean;
  social_media_publishers_allowed: boolean;
  missing_transactions_accepted: boolean;
  cookie_duration: string;
  allowed_platforms: AllowedPlatforms;
  allowed_mediums: AllowedMediums;
  conversion_flow: ConversionFlow;
}

export interface PayoutCategory {
  name: string;
  payout_type: string;
  payout: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  iso: string;
  name: string;
}

export interface AllowedPlatforms {
  web: boolean;
  mobile_web: boolean;
  android: boolean;
  ios: boolean;
}

export interface AllowedMediums {
  text_link: boolean;
  banner: boolean;
  deals: boolean;
  coupons: boolean;
  cashback: boolean;
  email: boolean;
  custom_email: boolean;
  pop_traffic: boolean;
  native_ads: boolean;
  facebook_ads: boolean;
  sem_brand_keywords: boolean;
  sem_generic_keywords: boolean;
}

export interface ConversionFlow {
  [string]: string;
}
