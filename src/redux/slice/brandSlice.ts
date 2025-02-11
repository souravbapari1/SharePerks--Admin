import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

import { BrandData } from "@/interface/brand";
import { toast } from "material-react-toastify";

// Define the interface for the manageBrand state

// Initialize the manageBrand state
const initialState: BrandData = {
  aboutBrand: "",
  linkUrl: "",
  isActive: true,
  btnText: "",
  provider: "",
  name: "",
  stockISIN: { label: "", value: "" },
  cashBackRates: "",
  offerTerms: "",
  category: [],
  commissionRate: 0,
  commissionRateWithHolding: 0,
  commissionType: "PERCENT",
};

// Create the manageBrand slice using Redux Toolkit
const manageBrand = createSlice({
  name: "manageBrand",
  initialState,
  reducers: {
    // Action to set a value in the manageBrand state
    setMangeBrandValue: (
      state,
      action: PayloadAction<{ key: keyof BrandData; value: any }>
    ) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },

    // Action to remove a content item from an offer term in the manageBrand state

    // Action to reset the manageBrand state to its initial values
    resetManageBrand: () => initialState,
    setMangeBrand: (_, action: PayloadAction<BrandData>) => action.payload,
  },
});

// Export the manageBrand actions
export const { setMangeBrandValue, resetManageBrand, setMangeBrand } =
  manageBrand.actions;

// Export the manageBrand reducer
export default manageBrand.reducer;

// Custom hook to access the manageBrand state and dispatch actions
export const useManageBrand = () => {
  const state = useAppSelector((e) => e.brandSlice);
  const dispatch = useAppDispatch();
  const setValue = (key: keyof BrandData, value: any) => {
    dispatch(setMangeBrandValue({ key, value }));
  };
  const validateState = (): boolean => {
    // Validate brandName
    if (state.name.trim().length === 0) {
      toast.error("Please Enter a Brand Name");
      return false;
    }

    // Validate brandLink
    if (state.linkUrl.trim().length === 0) {
      toast.error("Please Enter a Brand Link");
      return false;
    }
    if (state.stockISIN?.value.trim().length === 0) {
      toast.error("Please Select a Stock");
      return false;
    }
    // Validate brandLinkBtnText
    if (state.btnText.trim().length === 0) {
      toast.error("Please Enter a Brand Link Button Text");
      return false;
    }
    if (state.commissionRate == 0) {
      toast.error("Please Enter  offer commission rate ");
      return false;
    }

    if (state.commissionRateWithHolding == 0) {
      toast.error("Please Enter  offer commission rate with holding ");
      return false;
    }

    if (state.commissionType.trim().length == 0) {
      toast.error("Please Enter  offer commission type ");
      return false;
    }

    // Validate aboutBrand
    if (state.aboutBrand.trim().length === 0) {
      toast.error("Please Enter About Brand");
      return false;
    }

    // Validate cashbackRates
    if (!state.cashBackRates) {
      toast.error("Please Enter a Cashback Rate Ifo");
      return false;
    }

    // Validate offerTerms
    if (!state.offerTerms) {
      toast.error("Please Enter an Offer Term ");
      return false;
    }

    if (state.category.length == 0) {
      toast.error("Please Select category");
      return false;
    }
    if (state.provider.length == 0) {
      toast.error("Please Select provider");
      return false;
    }
    // Add additional validation checks for other required fields...

    return true;
  };
  return {
    state,
    dispatch,
    setValue,
    validateState,
  };
};
