import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  showPopup: (popup: PopupProps) => void;
  closePopup: (id: string) => void;
}

interface PopupProps {
  id: string;
  Component: React.FC<any>;
  props: any;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [popups, setPopups] = useState<PopupProps[]>([]);

  const showPopup = (popup: PopupProps) => {
    setPopups((prev) => [...prev, popup]);
  };

  const closePopup = (id: string) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      {children}
      {popups.map((popup) => (
        <popup.Component
          key={popup.id}
          isOpen={true}
          onClose={() => closePopup(popup.id)}
          {...popup.props}
        />
      ))}
    </PopupContext.Provider>
  );
};

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: () => void; // Optional callback for View Details button
  title?: string; // Modal title
  message?: string; // Modal message
  showCancelButton?: boolean; // Option to show the Cancel button
  popupMode?: boolean; // Option for popup mode
  cancelButtonText?: string; // Custom text for Cancel button
  viewDetailsButtonText?: string; // Custom text for View Details button
}
