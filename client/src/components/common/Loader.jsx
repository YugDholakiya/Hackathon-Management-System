import React from "react";
import { Triangle } from "react-loader-spinner";
import LoaderAnimation from "../../utils/Loader/LoaderAnimation.json";
import Animation from "./Animation/Animation";
function Loader() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-screen h-screen bg-[rgba(216,213,213,0.48)] z-[100]">
      <Animation path={LoaderAnimation} width="70%" height="100%" />
    </div>
  );
}

export default Loader;
