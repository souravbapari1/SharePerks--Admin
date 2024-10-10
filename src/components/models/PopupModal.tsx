import { PopupModalProps } from "@/hooks/useUserPopup";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { MdErrorOutline } from "react-icons/md";

const PopupModal: React.FC<PopupModalProps> = ({
  type,
  isOpen,
  onClose,
  showActionBtn = false,
  actionBtnText,
  closeBtnText,
  showCloseBtn = true,
  subtitle,
  title,
  onAction,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  const iconMap = {
    success: <HiOutlineBadgeCheck className="text-primary" size={100} />,
    error: <MdErrorOutline className="text-red" size={100} />,
    info: <AiFillInfoCircle className="text-yellow-600" size={100} />,
  };

  return (
    <div className="fixed left-0 top-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div
        ref={modalRef}
        className="w-full max-w-[800px] rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-20 md:py-25"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <span className="mx-auto inline-block">{iconMap[type]}</span>
        <h3
          id="modal-title"
          className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl"
        >
          {title}
        </h3>
        <p id="modal-description" className="mb-10 font-medium">
          {subtitle}
        </p>
        {(showCloseBtn || showActionBtn) && (
          <div className="-mx-3 flex flex-wrap justify-center items-center gap-y-4">
            {showCloseBtn && (
              <div className="w-full px-3 2xsm:w-1/2">
                <button
                  onClick={onClose}
                  className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                >
                  {closeBtnText || "Close"}
                </button>
              </div>
            )}
            {showActionBtn && (
              <div className="w-full px-3 2xsm:w-1/2">
                <button
                  onClick={onAction}
                  className={cn(
                    "block w-full rounded border p-3 text-center font-medium text-white transition hover:bg-opacity-90",
                    {
                      "border-primary bg-primary": type === "success",
                      "border-red bg-red": type === "error",
                      "border-yellow-600 bg-yellow-600": type === "info",
                    }
                  )}
                >
                  {actionBtnText || "Ok"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
