import CongratulationsModal from "@/components/models/CongratulationsModal";
import InfoModal from "@/components/models/InfoModel";
import PopupModal from "@/components/models/PopupModal";
import { InfoModalProps, usePopup } from "@/context/popupContext";

export const useUserPopup = () => {
  const { showPopup } = usePopup();

  const showInfoPopup = (props: InfoModalProps, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    showPopup({
      id,
      Component: InfoModal,
      props: props,
    });
  };

  const showGenericPopup = (props: PopupModalProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    showPopup({
      id,
      Component: PopupModal,
      props: props,
    });
  };

  const showCongratulationsPopup = (props: CongratulationsModalProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    showPopup({
      id,
      Component: CongratulationsModal,
      props: props,
    });
  };

  return {
    showInfoPopup,
    showGenericPopup,
    showCongratulationsPopup,
  };
};

export interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  type: "success" | "error" | "info";
  showActionBtn?: boolean;
  showCloseBtn?: boolean;
  actionBtnText?: string;
  closeBtnText?: string;
  title: string;
  subtitle: string;
}

export interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Modal title
  message?: string; // Modal message
  knowMoreLink?: string; // Link for Know More button
  knowMoreText?: string; // Text for Know More button
}
