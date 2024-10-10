import { useState } from "react";

export const useBrandSate = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [brandAbout, setBrandAbout] = useState<string>("");
  const [discountHighlights, setDiscountHighlights] = useState<string>("");
  const [offerTitle, setOfferTitle] = useState<string>("");
  const [offerContent, setOfferContent] = useState<string>("");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [brandBanner, setBrandBanner] = useState<File | null>(null);
  const [brandCategory, setBrandCategory] = useState<string>("");
  const [commissionProviderValue, setCommissionProviderValue] =
    useState<string>("");
  const [providerUrl, setProviderUrl] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
};
