import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";

function CommonButton({
  buttonName,
  className,
  activeButton,
  setActiveButton,
  groupButtonMembers,
}) {
  return (
    <Button
      onClick={() => setActiveButton(buttonName)}
      buttonStyle={`${twMerge(
        `w-auto flex-1 md:flex-none flex row justify-center font-medium px-4 py-2 transition-colors duration-100 m-[3px] rounded-md ${
          activeButton === buttonName
            ? "border-t border-b bg-blue-500 opacity-100 text-white shadow border-blue-500 "
            : "border bg-blue-50 text-gray-700 border-blue-50 hover:bg-green-200 hover:shadow-lg "
        } `,
        className
      )}`}
    >
      {buttonName}
    </Button>
  );
}

function GroupButtons({ groupButtonMembers, activeButton, setActiveButton }) {
  //  const members = groupButtonMembers;

  return (
    <>
      <div className={`flex flex-row flex-wrap justify-center w-full max-w-3xl border-2 shadow-md shadow-blue-500 border-blue-300 rounded-md p-1`}>
        {groupButtonMembers.map((member, index) => (
          <CommonButton
            key={index}
            buttonName={member}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            groupButtonMembers={groupButtonMembers}
          />
        ))}
      </div>
    </>
  );
}

export default GroupButtons;
