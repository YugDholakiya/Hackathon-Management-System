// MultiSelectDropdown.js

import React, { useEffect, useRef,useState } from "react";

function MultiSelectDropdown({ options, selectedOptions, onSelect,labelDropdown,labelStack ,ifFull}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${ifFull?"w-full" :"md:w-[355px]"}  `} ref={wrapperRef}>
      <div className="mb-5">
        <h2 className="text-gray-500 text-xs font-semibold mb-[2px]">{labelStack}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full  gap-1 h-auto ">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="bg-green-200 py-1 w-full md:p-1 text-center rounded-md text-sm"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <label
          className="block text-gray-500 text-xs font-semibold mb-[2px]"
          htmlFor="multi-select"
        >
         {labelDropdown}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="appearance-none w-full bg-white border border-gray-200 text-gray-500 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            Select...
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow overflow-y-auto max-h-60">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => onSelect(option)}
                  className={`cursor-pointer p-2 hover:bg-blue-500 ${
                    selectedOptions.includes(option)
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
