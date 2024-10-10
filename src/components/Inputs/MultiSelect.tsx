"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

interface Option {
  value: string;
  text: string;
}

interface DropdownProps {
  id: string;
  selectedOptions: Option[];
  availableOptions: Option[];
  onChange: (selected: Option[]) => void;
  disabled?: boolean; // Prop to handle disabled state
  label?: string;
}

const MultiSelect: React.FC<DropdownProps> = ({
  id,
  selectedOptions,
  availableOptions,
  onChange,
  disabled = false, // Default value for disabled is false
  label,
}) => {
  const [selected, setSelected] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);

  // Reflect changes in the selectedOptions and availableOptions props
  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const availableWithoutSelected = availableOptions.filter(
      (option) => !selectedOptions.some((sel) => sel.value === option.value)
    );
    setOptions(availableWithoutSelected);
  }, [availableOptions, selectedOptions]);

  const open = () => {
    if (!disabled) setShow(true);
  };

  const isOpen = () => {
    return show === true;
  };

  const select = (index: number, event: React.MouseEvent) => {
    if (disabled) return; // Prevent selection when disabled

    const newSelected = [...selected, options[index]];
    const newOptions = options.filter((_, i) => i !== index);

    setSelected(newSelected);
    setOptions(newOptions);
    onChange(newSelected); // Notify parent about selection change
  };

  const remove = (index: number) => {
    if (disabled) return; // Prevent removal when disabled

    const removedOption = selected[index];
    const newSelected = selected.filter((_, i) => i !== index);
    const newOptions = [...options, removedOption];

    setSelected(newSelected);
    setOptions(newOptions);
    onChange(newSelected); // Notify parent about selection change
  };

  const selectedValues = () => {
    return selected.map((option) => option.value);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative z-50">
      {label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div>
        <input name="values" type="hidden" value={selectedValues().join(",")} />
        <div className="flex flex-col items-center">
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div
                ref={trigger}
                onClick={open}
                className={`w-full ${disabled ? "cursor-not-allowed" : ""}`}
              >
                <div
                  className={`mb-2 flex rounded border border-stroke dark:border-form-strokedark py-2 pl-3 pr-3 outline-none transition ${
                    disabled
                      ? "bg-whiter dark:bg-gray-800 text-gray-400 cursor-not-allowed dark:bg-black"
                      : "focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  }`}
                >
                  <div className="flex flex-auto flex-wrap gap-x-2">
                    {selected.map((option, index) => (
                      <div
                        key={index + id}
                        className="my-1 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-3 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">
                          {option.text}
                        </div>
                        {!disabled && (
                          <div className="flex flex-auto flex-row-reverse">
                            <div
                              onClick={() => remove(index)}
                              className="cursor-pointer pl-2 hover:text-danger"
                            >
                              <IoIosClose size={20} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {selected.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder="Select an option"
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                          disabled={disabled}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                    {!disabled && (
                      <button
                        type="button"
                        onClick={open}
                        className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                      >
                        <IoIosArrowDown size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div
                  className={`absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${
                    isOpen() ? "" : "hidden"
                  } ${disabled ? "pointer-events-none opacity-50" : ""}`}
                  ref={dropdownRef}
                  onFocus={() => !disabled && setShow(true)}
                  onBlur={() => !disabled && setShow(false)}
                  style={{
                    maxHeight: "300px",
                  }}
                >
                  <div className="flex w-full flex-col">
                    {options.map((option, index) => (
                      <div key={index + "sdfdsf55"}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                          onClick={(event) => select(index, event)}
                        >
                          <div
                            className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                              selected.some((sel) => sel.value === option.value)
                                ? "border-primary"
                                : ""
                            }`}
                          >
                            <div className="flex w-full items-center">
                              <div className="mx-2 leading-6">
                                {option.text}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
