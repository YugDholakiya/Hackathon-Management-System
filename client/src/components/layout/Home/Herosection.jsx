import React from "react";
import HeroAnime from "../../../utils/herosection/herosection.json";
import Animation from "../../common/Animation/Animation";
import { Button } from "../../common/Button";

function Herosection() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row ">
        <div className="w-full  ">
          <div className="container mx-auto h-full lg:p-5 p-5">
            <div className="flex px-4 ">
              <div className="text-4xl md:mx-auto lg:mx-0  font-bold  ">
                Hackfolic<span className="text-blue-500">.</span>
                <span className="text-green-500">.</span>
                <span className="text-gray-400">.</span>
              </div>
              {/* <div className=" w-96"></div> */}
            </div>
            <div className="container px-4  mt-8  h-full md:w-full ">
              <div className="w-full ">
                <div className="text-3xl lg:text-5xl font-bold  ">
                  Redefining economic opportunites <span><br />with  <span className="text-blue-500">Hackathons</span></span> {" "}
                 
                </div>
                <div className="w-20 h-2 bg-green-500 my-4 flex flex-col"></div>
                <p className="text-base md:text-xl mb-5 lg:mb-10">
                  You have the potential to build something that can change the
                  world. We make sure that you get at least one shot at doing
                  so. At our core, we want to create opportunities for builders
                  through initiatives like
                  <span className="text-blue-500">ETHIndia:</span> the world's
                  largest Ethereum hackathon
                </p>
                <div className="flex md:justify-center lg:justify-start"><Button buttonStyle="bg-green-500 text-white text-2xl   font-medium px-4 py-2 rounded-lg border-2 border-green-500 hover:bg-white hover:text-gray-700 hover:border-blue-500 hover:shadow-xl ">
                  Learn More
                </Button></div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="       h-auto w-fit py-8">
          <Animation path={HeroAnime} width="50%" height="70%" />
        </div>
      </div>
    </>
  );
}

export default Herosection;
