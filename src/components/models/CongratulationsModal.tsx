"use client";
import { CongratulationsModalProps } from "@/hooks/useUserPopup";
import React, { useEffect, useRef } from "react";

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
  title = "Congratulations!",
  message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum been.",
  knowMoreLink = "#",
  knowMoreText = "Know More",
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
    <div className="fixed left-0 top-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div
        ref={modalRef}
        className="relative w-full max-w-[600px] rounded-lg bg-primary px-8 py-12 text-center md:px-10 md:py-15"
      >
        <span className="mx-auto inline-block">
          <svg
            width="78"
            height="78"
            viewBox="0 0 78 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.1"
              width="78"
              height="78"
              rx="37"
              fill="white"
            ></rect>
            <path
              d="M39.6114 16.8999C27.0342 16.8999 16.8984 27.0357 16.8984 39.6129C16.8984 52.1901 27.0342 62.3999 39.6114 62.3999C52.1887 62.3999 62.3984 52.1901 62.3984 39.6129C62.3984 27.0357 52.1887 16.8999 39.6114 16.8999ZM39.6114 59.8105C28.5139 59.8105 19.4879 50.7105 19.4879 39.6129C19.4879 28.5154 28.5139 19.4893 39.6114 19.4893C50.709 19.4893 59.809 28.5154 59.809 39.6129C59.809 50.7105 50.709 59.8105 39.6114 59.8105Z"
              fill="white"
            ></path>
            <path
              d="M49.6748 42.2023H29.5513C28.8854 42.2023 28.2935 42.4982 27.8496 43.0161C27.4797 43.534 27.2578 44.1258 27.4057 44.7917C28.5155 50.5624 33.6204 54.8535 39.613 54.8535C45.6057 54.8535 50.7106 50.6364 51.8204 44.7917C51.9683 44.1998 51.7464 43.534 51.3765 43.0161C51.0065 42.4982 50.3407 42.2023 49.6748 42.2023ZM39.613 52.2641C35.1 52.2641 31.1789 49.1567 30.0691 44.7917H49.2309C48.0472 49.1567 44.126 52.2641 39.613 52.2641Z"
              fill="white"
            ></path>
            <path
              d="M30.807 35.6919C32.4346 35.6919 33.7664 34.3602 33.7664 32.7325C33.7664 31.1049 32.4346 29.7732 30.807 29.7732C29.1794 29.7732 27.8477 31.1049 27.8477 32.7325C27.9216 34.4342 29.2533 35.6919 30.807 35.6919Z"
              fill="white"
            ></path>
            <path
              d="M48.4164 35.7659C50.0508 35.7659 51.3757 34.4409 51.3757 32.8065C51.3757 31.1721 50.0508 29.8472 48.4164 29.8472C46.782 29.8472 45.457 31.1721 45.457 32.8065C45.457 34.4409 46.782 35.7659 48.4164 35.7659Z"
              fill="white"
            ></path>
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-white sm:text-4xl">
          {title}
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <p className="mb-7.5 font-medium text-white">{message}</p>
        <a
          href={knowMoreLink}
          className="inline-block rounded border border-white px-12.5 py-3 text-center font-medium text-white transition hover:bg-white hover:text-primary"
        >
          {knowMoreText}
        </a>
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-primary"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
              className="fill-current stroke-current"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
