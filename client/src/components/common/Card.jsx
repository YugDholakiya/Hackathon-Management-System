import React, { useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDate, generalThunkFunction } from "../../redux/actions/Genralactions";

function Card({ cardData, pageName, handleUpdateFlag }) {
  const generalState = useSelector((state) => state.generalReducer);
  const loginState = useSelector((state) => state.registerLoginReducer);
  console.log(loginState);
  console.log(generalState);
  // console.log(cardData);
  // const [applicationStatus, setApplicationStatus] = useState("");
//   if (
//     pageName === "ParticipantMainPage" &&
//     generalState &&
//     generalState.hackathonApplications &&
//     generalState.hackathonApplications.length > 0 &&
//     loginState &&
//     loginState.roleDetails &&
//     loginState.roleDetails.length > 0
//   ) {
//     const LeaderId = loginState.roleDetails[0].id;
//     console.log(LeaderId)
//     const hackathonStatus = generalState.hackathonApplications.filter(
//       (application) => {
//         console.log(application)
//         console.log(application.id)
//         console.log(cardData.id)
// console.log(application.leaderId)

// console.log(LeaderId)
// console.log(parseInt(application.leaderId) === parseInt(LeaderId))
//         if (
//           parseInt(application.hackathonId) === parseInt(cardData.id) &&
//           parseInt(application.leaderId) === parseInt(LeaderId)
//         ) {
//           console.log(application.applicationStatus)
//         }
//       }
//     );
//     console.log(hackathonStatus)
//   //  setApplicationStatus(hackathonStatus)
//   }


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this hackathon?")) {
      const success = await dispatch(generalThunkFunction("DeleteHackathon", cardData.id));
      if (success) {
        if (handleUpdateFlag) {
          handleUpdateFlag();
        }
      } else {
        alert("Failed to delete hackathon");
      }
    }
  };

  const isHostUser = loginState && loginState.isAuth && loginState.role === "host" && loginState.roleDetails && loginState.roleDetails.length > 0 && cardData && cardData.hostId === loginState.roleDetails[0].id;
  let participantPastHackathons = ["2"];
  let participantAppliedHacathons = ["4"];
  
  let themeArray = cardData && cardData.techstacks ? cardData.techstacks : [];

  themeArray = themeArray.map((theme) => {
    return theme ? theme.toUpperCase() : "";
  });

  const startDate =
    cardData && cardData.hackathonStatus
      ? cardData.hackathonStatus === "UpComing"
        ? cardData.dates.registrationStart
        : cardData.hackathonStatus === "Open"
        ? cardData.dates.hackathonStart
        : ""
      : "";

  const formattedStartDate = startDate ? formatDate(startDate) : "";

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto hover:shadow-xl hover:shadow-gray-400">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg"></span>
        <div className="relative h-full p-3 bg-white border-2 border-blue-500 rounded-lg">
          <div className="flex items-center -mt-1">
            <svg
              className="w-8 h-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            <h3 className="my-2 ml-3 text-2xl font-extrabold text-gray-800">
              {cardData
                ? `${cardData.name} `
                : "Hackathon Name"}
            </h3>
          </div>

          <div className="font-semibold my-3 text-lg">
            {cardData ? cardData.tagline : "Tagline"}
          </div>
          <div className="my-2 text-gray-600 flex flex-col">
            <div className="flex">
              <div className="flex flex-col">
                <div className="font-bold text-gray-400">THEME</div>
                <div className="flex flex-col md:flex-row gap-y-2 gap-x-2 w-full h-auto">
                  {themeArray && themeArray.length > 0 ? (
                    <>
                      {themeArray.slice(0, 3).map((theme, index) => (
                        <div
                          key={index}
                          className="font-bold text-gray-400 mt-[0.1rem] py-[0.10rem] px-3 w-fit border-2 border-gray-300 rounded-3xl"
                        >
                          {theme}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="font-medium text-sm text-gray-400 py-[0.10rem] px-3 w-[9.75rem] md:w-[14.4rem] border-2 border-gray-300 rounded-3xl">
                        NO RESTRICTIONS
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="w-fit flex flex-col items-center font-bold justify-center ml-auto text-base text-green-600">
                100+
                <div>participants</div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap md:flex-row my-6 items-center justify-center gap-3 md:gap-7">
            {cardData && cardData.hackathonStatus && (
              <div
                className={`font-semibold text-gray-800 py-3 px-6 w-fit ${
                  cardData.hackathonStatus.toUpperCase() === "OPEN"
                    ? "bg-green-200"
                    : cardData.hackathonStatus.toUpperCase() === "CLOSED"
                    ? "bg-red-200"
                    : cardData.hackathonStatus.toUpperCase() === "UPCOMING"
                    ? "bg-yellow-200"
                    : cardData.hackathonStatus.toUpperCase() ===
                      "REGISTRATIONCLOSED"
                    ? "bg-blue-200"
                    : "bg-gray-200"
                }  border-0 border-gray-100 rounded-2xl text-sm md:text-base`}
              >
                {cardData && cardData.hackathonStatus
                  ? cardData.hackathonStatus.toUpperCase()
                  : ""}
              </div>
            )}

            {cardData && cardData.hackathonStatus === "Closed" ? null : (
              <div className="font-semibold text-gray-800 py-3 px-3 w-fit bg-gray-100 border-0 border-gray-100 rounded-2xl text-sm md:text-base">
                STARTS {formattedStartDate}
              </div>
            )}

            <div className="font-semibold text-gray-800 py-3 px-6 w-fit bg-gray-100 border-0 border-gray-100 rounded-2xl text-sm md:text-base">
              {cardData && cardData.mode ? cardData.mode.toUpperCase() : ""}
            </div>

            <div className="font-semibold text-gray-800 py-3 px-4 w-fit bg-gray-100 border-0 border-gray-100 rounded-2xl text-sm md:text-base">
              {cardData
                ? cardData.location
                  ? cardData.location.toUpperCase()
                  : "REMOTE"
                : ""}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-7">
            {cardData && (
              <>
                 {cardData.hackathonStatus &&
                (loginState.role === "participant") &&
                (cardData.hackathonStatus.toUpperCase() === "OPEN" ||
                  cardData.hackathonStatus.toUpperCase() === "CLOSED") ? (
                  <Button
                    onClick={() => {
                      if (
                        pageName === "ParticipantMainPage" ||
                        pageName === "HostMainPage" ||
                        pageName === "HackathonsPage" || pageName === "HappeningNowPage"
                      ) {
                        navigate(`/applyNow/${cardData.id}/${cardData.name}`);
                      }
                    }}
                    variant="primary"
                    buttonStyle="m-0 bg-blue-500 font-bold py-4 px-6"
                  >
                    {cardData.hackathonStatus.toUpperCase() === "OPEN" ||
                    !participantPastHackathons.includes(cardData.id)
                      ? "Apply Now"
                      : "See Projects"}
                  </Button>
                ) : null}
                <Button
                  variant="green"
                  buttonStyle="m-0 bg-green-500 font-bold py-4 px-6"
                  onClick={() => {
                    // console.log(cardData.name)
                    navigate(`/viewDetailPage/${cardData.id}`);
                  }}
                >
                  View Details
                </Button>
                {pageName === "HostMainPage" && (
                  <>
                  <Button
                    variant="primary"
                    buttonStyle="m-0 bg-blue-500 font-bold py-4 px-6 text-white hover:bg-blue-600"
                    onClick={() => navigate(`/editHackathon/${cardData.id}`)}
                  >
                    Edit Hackathon
                  </Button>
                  <Button
                    variant="danger"
                    buttonStyle="m-0 bg-red-500 font-bold py-4 px-6 text-white hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Remove Hackathon
                  </Button>
                  </>
                )}
                {/* {participantAppliedHacathons.includes(cardData.id) ||
                cardData.hackathonStatus.toUpperCase() === "OPEN" ||
                cardData.hackathonStatus.toUpperCase() === "UPCOMING" ||
                pageName === "HostApplicationsPage" ? (
                  <Button
                    variant="green"
                    buttonStyle="m-0 bg-green-500 font-bold py-4 px-6"
                    onClick={() => navigate(`/viewDetailPage/${cardData.id}`)}
                  >
                    View Details
                  </Button>
                ) : participantPastHackathons.includes(cardData.id) ? (
                  <>
                    <Button
                      variant="green"
                      buttonStyle="m-0 bg-green-500 font-bold py-4 px-6"
                      onClick={() => {
                        // console.log(cardData.name)
                        navigate(`/viewDetailPage/${cardData.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </>
                ) : null} */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
