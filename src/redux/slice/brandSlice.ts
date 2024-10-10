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
  cashBackRates: [
    {
      type: "percent",
      value: "",
      title: "",
    },
  ],
  discountHighLights: "",
  offerTerms: [
    {
      title: "",
      content: [""],
    },
  ],
  category: [],
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
    // Action to add a new cashback rate to the manageBrand state
    addCashbackRate: (state) => {
      state.cashBackRates.push({ value: "", title: "", type: "percent" });
    },
    setCashbackRateValue: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      state.cashBackRates[index].value = value;
    },
    setCashbackRateTitle: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      state.cashBackRates[index].title = value;
    },
    // Action to remove a cashback rate from the manageBrand state
    removeCashbackRate: (state, action: PayloadAction<number>) => {
      if (state.cashBackRates.length != 1) {
        state.cashBackRates.splice(action.payload, 1);
      } else {
        state.cashBackRates = [
          {
            title: "",
            value: "",
            type: "percent",
          },
        ];
      }
    },
    // Action to add a new offer term to the manageBrand state
    addOfferTerm: (state) => {
      state.offerTerms.push({ title: "", content: [""] });
    },
    setOfferTermTitle: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      state.offerTerms[index].title = value;
    },
    setOfferTermContent: (
      state,
      action: PayloadAction<{ index: number; contentIndex: number; value: any }>
    ) => {
      const { index, contentIndex, value } = action.payload;
      state.offerTerms[index].content[contentIndex] = value;
    },
    // Action to remove a offer term title from the manageBrand state
    // Action to remove an offer term from the manageBrand state
    removeOfferTerm: (state, action: PayloadAction<number>) => {
      if (state.offerTerms.length != 1) {
        state.offerTerms.splice(action.payload, 1);
      } else {
        state.offerTerms = [
          {
            title: "",
            content: [""],
          },
        ];
      }
    },
    // Action to add a new content item to an offer term in the manageBrand state
    addMoreOfferTerm: (state, action: PayloadAction<number>) => {
      state.offerTerms[action.payload].content.push("");
    },
    // Action to remove a content item from an offer term in the manageBrand state
    removeOfferTermContent: (
      state,
      action: PayloadAction<{ index: number; contentIndex: number }>
    ) => {
      if (state.offerTerms[action.payload.index].content.length != 1) {
        state.offerTerms[action.payload.index].content.splice(
          action.payload.contentIndex,
          1
        );
      } else {
        state.offerTerms[action.payload.index].content = [""];
      }
    },
    // Action to reset the manageBrand state to its initial values
    resetManageBrand: () => initialState,
    setMangeBrand: (_, action: PayloadAction<BrandData>) => action.payload,
  },
});

// Export the manageBrand actions
export const {
  setMangeBrandValue,
  addCashbackRate,
  addMoreOfferTerm,
  addOfferTerm,
  removeCashbackRate,
  setCashbackRateTitle,
  setCashbackRateValue,
  removeOfferTerm,
  resetManageBrand,
  removeOfferTermContent,
  setOfferTermContent,
  setOfferTermTitle,
  setMangeBrand,
} = manageBrand.actions;

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

    // Validate aboutBrand
    if (state.aboutBrand.trim().length === 0) {
      toast.error("Please Enter About Brand");
      return false;
    }

    // Validate discountHighLights
    if (state.discountHighLights.trim().length === 0) {
      toast.error("Please Enter Discount Highlights");
      return false;
    }

    // Validate cashbackRates
    if (
      state.cashBackRates.some(
        (rate) =>
          rate.value.toString().length === 0 || rate.title.trim().length === 0
      )
    ) {
      toast.error("Please Enter a Cashback Rate Value and Title");
      return false;
    }

    // Validate offerTerms
    if (
      state.offerTerms.some(
        (term) =>
          term.title.trim().length === 0 ||
          term.content.some((content) => content.trim().length === 0)
      )
    ) {
      toast.error("Please Enter an Offer Term Title and Content");
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
