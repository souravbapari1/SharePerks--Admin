export interface CouponData {
  _id?: string;
  aboutCoupon: string;
  brandId: string;
  clicks?: number;
  code: string;
  commissionRate: number;
  commissionType: string;
  expDate: string;
  bannerImage?: string;
  couponImage?: string;
  isEnable: boolean;
  link: string;
  linkText: string;
  category: string;
  couponKeyPoints: Array<string>;
  couponTitle: string;
  provider: string;
  stockISIN: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  categoryData?: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isExpired?: boolean;
}
