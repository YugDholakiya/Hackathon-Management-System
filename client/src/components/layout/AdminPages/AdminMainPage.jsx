import React from "react";
import MainPage from "../../common/MainPages/MainPage";
import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";
function AdminMainPage() {
  const groupButtonMembers = [
    "Hackathons",
    "Hosts",
    "Participants",
    "Add New Hackathon",
    "Add New User"
  ];

  const generalState = useSelector(state=>state.generalReducer);
  const dispatch =useDispatch();
   
    const allHackathons = generalState.hackathons;
    const allParticipants = generalState.participants;
    const allHosts = generalState.hosts;
    
    useEffect(() => {
      // Dispatch action to fetch hackathons data
      dispatch(generalThunkFunction("getAllHackathons"));
      dispatch(generalThunkFunction("getAllParticipants"));
      dispatch(generalThunkFunction("getAllHosts"));
      // dispatch(generalThunkFunction("getAllHackathons"));
    }, [dispatch]);
  
        console.log(generalState)
  // console.log(hackathons)

  return (
    <>
      <MainPage
      pageName ="AdminMainPage"
      paginationDataProp={[allHackathons, allParticipants, allHosts]}
        role="Admin"
        buttonMembers={groupButtonMembers}
        currentMember={groupButtonMembers[0]}
      />
    </>
  );
}

export default AdminMainPage;
