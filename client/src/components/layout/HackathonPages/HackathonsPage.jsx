import React, { useEffect, useState } from "react";
import MainPage from "../../common/MainPages/MainPage";
import { useSelector,useDispatch } from "react-redux";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";
function HackathonsPage() {
  const generalState = useSelector(state=>state.generalReducer);
const dispatch =useDispatch();
  const groupButtonMembers = ["Open", "Closed", "Upcoming"];
  const allHackathons = generalState.hackathons;
  
  useEffect(() => {
    // Dispatch action to fetch hackathons data
    dispatch(generalThunkFunction("getAllHackathons"));
  }, [dispatch]);

      console.log(generalState)
// console.log(hackathons)
  return (
    <>
      <MainPage
      pageName ="HackathonsPage"
      paginationDataProp ={allHackathons}
        buttonMembers={groupButtonMembers}
        currentMember={groupButtonMembers[0]}
      />
    </>
  );
}

export default HackathonsPage;
