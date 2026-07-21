import React, { useEffect, useState } from "react";
import GroupButtons from "../Search-Sort-Filter/GroupButtons";
import SearchSort from "../Search-Sort-Filter/SearchSort";
import Pagination from "../Pagination/Pagination";
import MainProfilePage from "./MainProfilePage";
import MainListItem from "./MainListItem";
import Card from "../Card";
import RegisterLogin from "../../Login-Register/RegisterLogin";
import AddHackathonForm from "../../layout/HackathonPages/AddHackathonsForm";
import { useSelector, useDispatch } from "react-redux";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";

import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
function MainPage({
  buttonMembers,
  currentMember,
  role,
  // paginationDataProp,
  pageName,
}) {
  console.log(pageName);
  // console.log(paginationDataProp);
  const generalState = useSelector((state) => state.generalReducer);
  const loginState = useSelector((state) => state.registerLoginReducer);
  console.log(loginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [hackathonsApplications, setHackathonsApplications] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [groupButtonMembers, setGroupButtonMembers] = useState([
    "open",
    "past",
    "upComing",
  ]);
  const [activeButton, setActiveButton] = useState("open");
  const [paginationData, setPaginationData] = useState([]);
  const [searchSortFlag, setSearchSortFlag] = useState(true);
  const [paginationFlag, setPaginationFlag] = useState(true);
  const [updateFlag,setUpdateFlag] = useState(false);

  function handleUpdateFlag () {
    setUpdateFlag(!updateFlag);
  }
  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
    dispatch(generalThunkFunction("getAllParticipants"));
    dispatch(generalThunkFunction("getAllHosts"));
    dispatch(generalThunkFunction("getAllHackathonsApplications"));
  }, [updateFlag]);

  useEffect(() => {
    setHackathons(generalState.hackathons);
    setParticipants(generalState.participants);
    setHosts(generalState.hosts);
    setHackathonsApplications(generalState.hackathonApplications);
  
  }, [generalState]);
  console.log(generalState);
  console.log(hackathonsApplications);
  useEffect(() => {
    setUserRole(role);
    setGroupButtonMembers(buttonMembers);
    setActiveButton(currentMember);
  }, [buttonMembers, currentMember, role]);

  useEffect(() => {
    let newPaginationData;
    const activeUpper = activeButton ? activeButton.toUpperCase() : "";

    if (
      pageName === "HackathonsPage" &&
      (activeUpper === "OPEN" ||
        activeUpper === "CLOSED" ||
        activeUpper === "UPCOMING") &&
      hackathons
    ) {
      newPaginationData = hackathons.filter((data) => {
        if (
          data.hackathonStatus &&
          typeof data.hackathonStatus === "string" &&
          data.hackathonStatus.toUpperCase() === activeUpper
        ) {
          return data;
        }
      });
      setPaginationData(newPaginationData); // Update paginationData with filtered data
    } else if (pageName === "ParticipantMainPage") {
    } else if (
      pageName === "ParticipantMainPage" &&
      activeUpper === "APPLIED HACKATHONS"
    ) {
      const participantId = loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0].id : null;
      const participantAppliedHackathonIds = hackathonsApplications
        .filter((app) => app.leaderId === participantId)
        .map((app) => app.hackathonId);

      const newAppliedHackthons = hackathons.filter(
        (hackathon) =>
          participantAppliedHackathonIds.includes(hackathon.id) &&
          hackathon.hackathonStatus.toUpperCase() === "OPEN"
      );

      console.log(newAppliedHackthons);

      setPaginationData(newAppliedHackthons);
    } else if (
      pageName === "ParticipantMainPage" &&
      activeUpper === "PAST HACKATHONS"
    ) {
      const participantId = loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0].id : null;
      const participantAppliedHackathonIds = hackathonsApplications
        .filter((app) => app.leaderId === participantId)
        .map((app) => app.hackathonId);

      const newPastHackthons = hackathons.filter(
        (hackathon) =>
          participantAppliedHackathonIds.includes(hackathon.id) &&
          hackathon.hackathonStatus.toUpperCase() === "CLOSED"
      );

      console.log(newPastHackthons);

      setPaginationData(newPastHackthons);
    } else if (pageName === "HostMainPage" && activeUpper === "OPEN") {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const hostId = loginState.roleDetails[0].id;

        const hostOpenHackathons = hackathons.filter((hackathon) => {
          if (
            hackathon.hostId === hostId &&
            hackathon.hackathonStatus.toUpperCase() === "OPEN"
          ) {
            return hackathon;
          }
        });

        console.log(hostOpenHackathons);
        setPaginationData(hostOpenHackathons);
      }
    } else if (pageName === "HostMainPage" && (activeUpper === "CLOSED" || activeUpper === "PAST")) {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const hostId = loginState.roleDetails[0].id;

        const hostClosedHackathons = hackathons.filter((hackathon) => {
          if (
            hackathon.hostId === hostId &&
            hackathon.hackathonStatus.toUpperCase() === "CLOSED"
          ) {
            return hackathon;
          }
        });

        console.log(hostClosedHackathons);
        setPaginationData(hostClosedHackathons);
      }
    } else if (pageName === "HostMainPage" && activeUpper === "UPCOMING") {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const hostId = loginState.roleDetails[0].id;

        const hostUpcomingHackathons = hackathons.filter((hackathon) => {
          if (
            hackathon.hostId === hostId &&
            hackathon.hackathonStatus.toUpperCase() === "UPCOMING"
          ) {
            return hackathon;
          }
        });

        console.log(hostUpcomingHackathons);
        setPaginationData(hostUpcomingHackathons);
      }
    } else if (
      pageName === "HostApplicationsPage" &&
      activeUpper === "PENDING"
    ) {
      const hostId = loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0].id : null;
      const hostHackathonIds = hackathons
        .filter(h => h.hostId === hostId)
        .map(h => h.id);
     
      const hostAllApplications = hackathonsApplications.filter(
        (application) => {
          if (
            hostHackathonIds.includes(application.hackathonId) &&
            application.applicationStatus.toUpperCase() === "PENDING"
          ) {
            return application;
          }
        }
      );
      setPaginationData(hostAllApplications);
    }
    else if (
      pageName === "HostApplicationsPage" &&
      activeUpper === "ACCEPTED"
    ) {
      const hostId = loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0].id : null;
      const hostHackathonIds = hackathons
        .filter(h => h.hostId === hostId)
        .map(h => h.id);
     
      const hostAllApplications = hackathonsApplications.filter(
        (application) => {
          if (
            hostHackathonIds.includes(application.hackathonId) &&
            application.applicationStatus.toUpperCase() === "ACCEPTED"
          ) {
            return application;
          }
        }
      );
      setPaginationData(hostAllApplications);
    }
  }, [activeButton, hackathons, hosts, participants, hackathonsApplications, loginState, pageName]);

  console.log(activeButton);

  return (
    <>
      <div>
        <div className="flex justify-center items-center my-10 px-4">
          <GroupButtons
            groupButtonMembers={groupButtonMembers}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>

        {(pageName === "HostMainPage") && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/addNewHackathon")}
              variant="primary"
              buttonStyle="m-0 bg-blue-500 font-bold py-3 px-6 text-white hover:bg-blue-600 shadow-md"
            >
              Create New Hackathon
            </Button>
            <Button
              onClick={() => {
                const hostId = loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0].id : "";
                navigate(`/HostApplicationsDashBoard/${hostId}`);
              }}
              variant="green"
              buttonStyle="m-0 bg-green-500 font-bold py-3 px-6 text-white hover:bg-green-600 shadow-md"
            >
              See Applications
            </Button>
          </div>
        )}

        {searchSortFlag ? <SearchSort /> : null}

        {/* {pageToLoad(activeButton)} */}
        {/* <AddHackathonForm /> */}

        {paginationFlag && paginationData && paginationData.length > 0 ? (
          <>
            <div className=" my-10">
              <Pagination
                handleUpdateFlag={handleUpdateFlag}
                pageName={pageName}
                activeButton={activeButton}
                data={paginationData}
                recordsPerPage={10}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-fit p-5 "
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center my-10">
            <p className="text-gray-500 text-lg">No data available to display.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
