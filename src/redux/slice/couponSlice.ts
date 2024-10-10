import { OfferData } from "@/interface/offers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "material-react-toastify";
import { isValidUrl } from "@/helper/helper";
import { CouponData } from "@/interface/coupon";

const initialState: CouponData = {
  aboutCoupon: "",
  brandId: "",
  category: "",
  commissionRate: 0,
  commissionType: "PERCENT",
  expDate: "",
  isEnable: true,
  link: "",
  linkText: "",
  couponKeyPoints: [""],
  couponTitle: "",
  provider: "",
  stockISIN: "",
  code: "",
};

const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {
    setMangeCouponValue: (
      state,
      action: PayloadAction<{ key: keyof CouponData; value: any }>
    ) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    addCouponBenefits: (state) => {
      return { ...state, couponKeyPoints: [...state.couponKeyPoints, ""] };
    },
    setCouponBenefits: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      state.couponKeyPoints[index] = value;
    },
    removeCouponBenefits: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.couponKeyPoints.splice(index, 1);
    },
    resetCouponManager: () => {
      return initialState;
    },
    initCoupon: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      return data;
    },
  },
});

export const {
  addCouponBenefits,
  removeCouponBenefits,
  resetCouponManager,
  setMangeCouponValue,
  setCouponBenefits,
  initCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;

export const useCouponRedux = () => {
  const state = useAppSelector((e) => e.couponSlice);

  const dispatch = useAppDispatch();
  const setValue = (key: keyof CouponData, value: any) => {
    dispatch(setMangeCouponValue({ key, value }));
  };

  const validateState = () => {
    if (state.couponKeyPoints.some((e) => e.trim().length == 0)) {
      toast.error("Please Enter  all coupon Benefits ");
      return false;
    }

    if (state.couponTitle.trim().length == 0) {
      toast.error("Please Enter coupon title");
      return false;
    }
    if (state.aboutCoupon.trim().length == 0) {
      toast.error("Please Enter  coupon description");
      return false;
    }

    if (state.brandId.trim().length == 0) {
      toast.error("Please Enter  coupon brand");
      return false;
    }

    if (state.category.trim().length == 0) {
      toast.error("Please Enter  coupon category");
      return false;
    }

    if (state.commissionRate == 0) {
      toast.error("Please Enter  coupon commission rate ");
      return false;
    }

    if (state.commissionType.trim().length == 0) {
      toast.error("Please Enter  coupon commission type ");
      return false;
    }

    if (state.link.trim().length == 0) {
      toast.error("Please Enter  coupon link ");
      return false;
    }

    if (!isValidUrl(state.link)) {
      toast.error("Please Enter valid coupon link ");
      return false;
    }

    if (state.linkText.trim().length == 0) {
      toast.error("Please Enter  coupon link text ");
      return false;
    }

    if (state.provider.trim().length == 0) {
      toast.error("Please Enter  coupon provider ");
      return false;
    }
    if (state.stockISIN.value.trim().length == 0) {
      toast.error("Please Enter  coupon broker ");
      return false;
    }

    if (state.expDate.trim().length == 0) {
      toast.error("Please Enter  coupon expired date ");
      return false;
    }

    if (state.code.trim().length == 0) {
      toast.error("Please Enter  coupon code ");
      return false;
    }

    return true;
  };
  return {
    state,
    dispatch,
    setValue,
    validateState,
  };
};
