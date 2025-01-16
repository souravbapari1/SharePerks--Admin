"use client";
import TitleCard from "@/components/cards/TitleCard";
import TextEditor from "@/components/Inputs/TextEditor";
import { setMangeOfferValue, useOfferRedux } from "@/redux/slice/offerSlice";

function OfferBenefits() {
  const { setValue, state, dispatch } = useOfferRedux();
  return (
    <TitleCard title="Offer Benefits">
      <TextEditor
        content={state.offerKeyPoints}
        onChange={(e) =>
          dispatch(setMangeOfferValue({ key: "offerKeyPoints", value: e }))
        }
      />
    </TitleCard>
  );
}

export default OfferBenefits;
