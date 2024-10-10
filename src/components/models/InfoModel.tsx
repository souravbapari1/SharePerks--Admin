"use client";
import { InfoModalProps } from "@/context/popupContext";
import React, { useEffect, useRef } from "react";

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  onViewDetails,
  title = "Your Message Sent Successfully",
  message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
  showCancelButton = true,
  popupMode = false,
  cancelButtonText = "Cancel", // Default text for Cancel button
  viewDetailsButtonText = "View Details", // Default text for View Details button
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset"; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset"; // Clean up
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-0 top-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        popupMode ? "bg-opacity-75" : ""
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-[800px] rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-20 md:py-25 transition-transform transform duration-300 ease-in-out ${
          popupMode ? "shadow-lg" : ""
        }`}
        role="dialog"
        aria-modal="true"
      >
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-[22.5rem] rounded bg-primary"></span>
        <p className="mb-10 font-medium">{message}</p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          {showCancelButton && (
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                onClick={onClose}
                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
              >
                {cancelButtonText} {/* Custom text for Cancel button */}
              </button>
            </div>
          )}
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onViewDetails}
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {viewDetailsButtonText}{" "}
              {/* Custom text for View Details button */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
