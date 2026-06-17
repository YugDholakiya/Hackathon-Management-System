import React from "react";
import MainPage from "../../common/MainPages/MainPage";

function HostHackathonsPage() {
  const groupButtonMembers = ["open", "past", "upComing"];

  return (
    <>
      <MainPage
        role="Host"
        buttonMembers={groupButtonMembers}
        currentMember={groupButtonMembers[0]}
      />
    </>
  );
}

export default HostHackathonsPage;
