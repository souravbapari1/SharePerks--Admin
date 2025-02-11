import { OfferData } from "@/interface/offers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "material-react-toastify";
import { isValidUrl } from "@/helper/helper";

const initialState: OfferData = {
  aboutOffer: "",
  brandId: "",
  category: "",
  commissionRate: 0,
  commissionRateWithHolding: 0,
  commissionType: "PERCENT",
  expDate: "",
  isEnable: true,
  isInSlide: false,
  link: "",
  linkText: "",
  offerKeyPoints: "",
  offerTitle: "",
  provider: "",
  stockISIN: "",
};

const offerSlice = createSlice({
  name: "offerSlice",
  initialState,
  reducers: {
    setMangeOfferValue: (
      state,
      action: PayloadAction<{ key: keyof OfferData; value: any }>
    ) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },

    resetOfferManager: () => {
      return initialState;
    },
    initOffer: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      return data;
    },
  },
});

export const {
  resetOfferManager,
  setMangeOfferValue,

  initOffer,
} = offerSlice.actions;

export default offerSlice.reducer;

export const useOfferRedux = () => {
  const state = useAppSelector((e) => e.offerSlice);

  const dispatch = useAppDispatch();
  const setValue = (key: keyof OfferData, value: any) => {
    dispatch(setMangeOfferValue({ key, value }));
  };

  const validateState = () => {
    if (!state.offerKeyPoints) {
      toast.error("Please Enter  all Offer Benefits ");
      return false;
    }

    if (state.offerTitle.trim().length == 0) {
      toast.error("Please Enter offer title");
      return false;
    }
    if (state.aboutOffer.trim().length == 0) {
      toast.error("Please Enter  offer description");
      return false;
    }

    if (state.brandId.trim().length == 0) {
      toast.error("Please Enter  offer brand");
      return false;
    }

    if (state.category.trim().length == 0) {
      toast.error("Please Enter  offer category");
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

    if (state.link.trim().length == 0) {
      toast.error("Please Enter  offer link ");
      return false;
    }

    if (!isValidUrl(state.link)) {
      toast.error("Please Enter valid offer link ");
      return false;
    }

    if (state.linkText.trim().length == 0) {
      toast.error("Please Enter  offer link text ");
      return false;
    }

    if (state.provider.trim().length == 0) {
      toast.error("Please Enter  offer provider ");
      return false;
    }
    if (state.stockISIN.value.trim().length == 0) {
      toast.error("Please Enter  offer broker ");
      return false;
    }

    if (state.expDate.trim().length == 0) {
      toast.error("Please Enter  offer expired date ");
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
