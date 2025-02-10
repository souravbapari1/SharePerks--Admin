"use client";

const Switcher = ({
  enabled = false,
  setEnabled,
}: {
  enabled?: boolean;
  setEnabled?: (e: boolean) => void;
}) => {
  return (
    <div>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            onChange={() => {
              if (setEnabled) {
                setEnabled(!enabled);
              }
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full !bg-primary "
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switcher;
