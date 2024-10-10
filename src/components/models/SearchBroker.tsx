import { stocks } from "@/data/stocks";
import React, { memo, useState, useRef, useEffect } from "react";
import Input from "../Inputs/Input";
import { cn } from "@/lib/utils";

interface SearchBrokerProps {
  onClose: () => void;
  onClick: (e: { label: string; value: string }) => void;
}
const SearchBroker: React.FC<SearchBrokerProps> = ({ onClose, onClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Filter stocks based on the search term
  const filteredStocks = stocks.filter((stock) => {
    const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive matching
    return regex.test(stock.label) || regex.test(stock.value);
  });

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Call the onClose function passed as prop
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 right-0 z-999999 bg-black/35 w-screen h-screen flex justify-center items-center">
      <div
        ref={modalRef}
        className="max-w-[500px] w-full max-h-[80vh] min-h-[30vh] overflow-auto relative bg-white dark:bg-black border-2 shadow border-gray dark:border-graydark"
      >
        <div className="p-6 sticky bg-white dark:bg-black w-full z-40 shadow-1">
          <Input
            placeholder="Search Broker"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full h-full overflow-auto relative pt-5">
          {filteredStocks.length === 0 ? (
            <div className="p-8 text-center">No Stocks Found</div>
          ) : null}
          {filteredStocks.map((stock) => {
            return (
              <div
                className="p-3 px-8 hover:bg-gray cursor-pointer border-t overflow-hidden border-gray dark:border-black"
                key={stock.value}
                onClick={() => onClick(stock)}
              >
                <p className="line-clamp-1">
                  {stock.label} - {stock.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchBroker);

export function SelectBrokerInput({
  onChange,
  value,
  className,
}: {
  value?: { label: string; value: string };
  onChange: (e: { label: string; value: string }) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Input
        className={cn("mt-2 cursor-pointer", className)}
        readOnly
        onClick={() => setOpen(true)}
        value={value?.label || ""}
      />
      {open && (
        <SearchBroker
          onClose={() => setOpen(false)}
          onClick={(e) => {
            onChange(e);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
