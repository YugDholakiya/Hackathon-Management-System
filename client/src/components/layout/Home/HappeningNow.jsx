import React, { useEffect, useState } from "react";
import Card from "../../common/Card";
import Animation from "../../common/Animation/Animation";
import HappeningAnime from "../../../utils/Happeningnowsection/HappeningnowAnime.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HappeningNow() {
  const generalState = useSelector((state) => state.generalReducer);
  const [hackathons, setHackathons] = useState([]);
  console.log(generalState);

  const navigate = useNavigate();
  const cards = [1, 2, 3, 4];
  useEffect(() => {
    if (
      generalState &&
      generalState.hackathons &&
      generalState.hackathons.length > 0
    ) {
      setHackathons(generalState.hackathons);
    }
  }, [generalState]);

  return (
    <>
      <section className="p-5 ">
        <div className="container p-4 mx-auto my-6 space-y-1 text-center">
          {/* <span className="text-base font-bold tracking-wider uppercase ">shortcut to your dream ui</span> */}
          <div className="pb-0 lg:pb-3 text-4xl font-bold md:text-4xl border-b-4 border-green-500 w-fit mx-auto ">
            Happening now<span className="text-blue-500">.</span>
            <span className="text-green-500">.</span>
            <span className="text-gray-400">.</span>
          </div>
          {/* <p>Get a jumpstart to creating your new webpage! With our fully responsive and carefully styled components you can get the structure of your website done with just a couple of clicks.</p> */}
        </div>
        <div className="flex  ">
          <div className=" hidden lg:block   w-2/3  ">
            <div className=" w-fit h-fit flex my-[5rem]    ">
              {" "}
              <Animation path={HappeningAnime} width="105%" height="100%" />
            </div>
          </div>
          <div className="  pt-0 lg:pt-5 grid grid-cols-1 w-fit lg:w-[60%]  gap-y-6 place-items-center md:mx-auto lg:mx-0 lg:gap-5   ">
            {hackathons
              .filter(
                (hackathon) =>
                  hackathon.hackathonStatus.toUpperCase() === "OPEN"
              )
              .slice(0, 3)
              .map((cardData) => (
                <Card cardData={cardData} pageName="HappeningNowPage" />
              ))}

            <div className=" text-xl text-blue-500 font-bold text-center mx-auto    hover:text-gray-700  w-fit  ">
              <span
                onClick={() => navigate("/hackathons")}
                className="py-1 border-b-4 border-white hover:border-green-500"
              >
                See all
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HappeningNow;
