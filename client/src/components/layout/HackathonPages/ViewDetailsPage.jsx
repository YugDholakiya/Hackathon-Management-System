import React, { useEffect, useState } from "react";
import Animation from "../../common/Animation/Animation";
import ViewDetailsAnimation from "../../../utils/ViewDetailsPage/ViewDetailAnimation.json";
import EventDetailsIcon from "../../../utils/ViewDetailsPage/Olympic Torch.json";
import PrizePoolAnimation from "../../../utils/ViewDetailsPage/PrizeAnimation.json";
import PerksAnimation from "../../../utils/ViewDetailsPage/Perks Animation.json";
import { Button } from "../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";
import { formatDate } from "../../../redux/actions/Genralactions";

function DetailsBlock({ details }) {
  return (
    <div className="w-full mt-5 space-y-6">
      {details.map((detail, index) => (
        <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm" key={index}>
          <div className="flex items-center justify-center flex-shrink-0 bg-blue-50 rounded-lg w-16 h-16 shadow-inner">
            <Animation path={detail.icon.path} width={detail.icon.width} height={detail.icon.height} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-1.5 mb-2">{detail.title}</h4>
            
            {index === 2 ? (
              /* Exclusive Perks Badges */
              <div className="flex flex-wrap gap-2 mt-2">
                {detail.subDetails.map((perk, idx) => (
                  <span key={idx} className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 shadow-sm transition-transform hover:scale-105 duration-150">
                    {perk}
                  </span>
                ))}
              </div>
            ) : index === 1 ? (
              /* Prize Pool Card */
              <div className="mt-2">
                {detail.subDetails.map((subDetail, idx) => (
                  <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-4 w-fit shadow-sm flex items-center space-x-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <span className="text-amber-600 text-xs font-extrabold uppercase tracking-wider block">{subDetail.title}</span>
                      <span className="text-2xl font-black text-amber-800 block mt-0.5">
                        {typeof subDetail.Description === 'number' || !isNaN(subDetail.Description) 
                          ? `₹${parseFloat(subDetail.Description).toLocaleString()}` 
                          : subDetail.Description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Event Details Grid */
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {detail.subDetails.map((subDetail, idx) => (
                  <div key={idx} className="flex flex-col bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{subDetail.title}</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{subDetail.Description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ViewDetailsPage() {
  const [hackathonDetails, setHackathonDetails] = useState([]);
  const generalState = useSelector((state) => state.generalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const loginState = useSelector((state) => state.registerLoginReducer);

  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
  }, []);

  useEffect(() => {
    const hackathon = generalState.hackathons.find((hackathon) => hackathon.id === hackathonId);
    console.log(hackathon);
    if (hackathon) {
      setHackathonDetails(hackathon);
    }
  }, [generalState]);


  let detail ;

  if (hackathonDetails && Object.keys(hackathonDetails).length > 0) {
    detail = [
      {
        title: "Event Details",
        icon: { path: EventDetailsIcon, width: "65%", height: "100%" },
        subDetails: [
          {
            title: "Registrations",
            Description: `From: ${formatDate(hackathonDetails.dates.registrationStart)} Till :${formatDate(
              hackathonDetails.dates.registrationEnd
            )} `,
          },
          {
            title: "Event",
            Description: `From: ${formatDate(hackathonDetails.dates.hackathonStart)} Till :${formatDate(
              hackathonDetails.dates.hackathonEnd
            )} `,
          },
          { title: "Mode", Description: `${hackathonDetails.mode}` },
          { title: "Venue", Description: `${hackathonDetails.location}` },
          {
            title: "teamSize",
            Description: `Minimum: ${hackathonDetails.teamSize.min} Maximum: ${hackathonDetails.teamSize.max}`,
          },
          { title: "Theme", Description: `${hackathonDetails.techstacks}` },
        ],
      },
      {
        title: "Prize Pool",
        icon: { path: PrizePoolAnimation, width: "110%", height: "100%" },
        subDetails: [
          {
            title: "Prize",
            Description: `${hackathonDetails.prizes && hackathonDetails.prizes.prizePool !== undefined
              ? hackathonDetails.prizes.prizePool
              : "not defined"}`,
          },
        ]
        },
      {
        title: "Exclusive Perks",
        icon: { path: PerksAnimation, width: "110%", height: "100%" },
        subDetails: hackathonDetails.prizes && Array.isArray(hackathonDetails.prizes.perks)
        ? hackathonDetails.prizes.perks
        : ["no other perks"],
      },
    ];
  }
  else{

detail = [
  {
    title: "Event Details",
    icon: { path: EventDetailsIcon, width: "65%", height: "100%" },
    subDetails: [
      {
        title: "Registrations",
        Description: `From:  Till : `,
      },
      {
        title: "Event",
        Description: `From:  Till :`,
      },
      { title: "Mode", Description: `` },
      { title: "Venue", Description: `` },
      {
        title: "teamSize",
        Description: `Minimum:  Maximum: `,
      },
      { title: "Theme", Description: `` },
    ],
  },
  {
    title: "Prize Pool",
    icon: { path: PrizePoolAnimation, width: "110%", height: "100%" },
    subDetails: [{ title: "Prize", Description: `` }],
  },
  {
    title: "Exclusive Perks",
    icon: { path: PerksAnimation, width: "110%", height: "100%" },
    subDetails: [],
  },
]

  }

  return (
    <>
      <div className="container flex flex-col lg:flex-row p-8 justify-center items-center lg:h-full mx-auto  lg:gap-10   w-full ">
        <div className="flex items-center justify-center w-full lg:w-auto ">
          <Animation path={ViewDetailsAnimation} width="100%" height="100%" />
        </div>
        <div className="flex flex-wrap items-center w-full lg:w-fit  p-3 md:p-5 ">
          <div className=" w-full ">
            <div className="flex flex-col w-full ">
              <h3 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight md:text-4xl border-b-4 border-green-500 w-fit pb-1 ">
                {hackathonDetails && hackathonDetails.name ? hackathonDetails.name : "Hackathon Details"}
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl  ">
                {hackathonDetails?hackathonDetails.description:"no description"}
              </p>
            </div>
            <DetailsBlock details={detail} />

            {hackathonDetails && hackathonDetails.hackathonStatus && hackathonDetails.hackathonStatus.toUpperCase() === "OPEN" && (
              <div className="ml-[75px] md:mx-auto my-10 w-fit">
                <Button
                  onClick={() => navigate(`/applyNow/${hackathonId}/${hackathonDetails.name}`)}
                  variant="primary"
                  buttonStyle="m-0 bg-blue-500 font-bold py-4 px-6"
                >
                  Apply Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetailsPage;
