import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="max-width h-[calc(100vh-56px)] w-full bg-gray-400 flex justify-center items-center border">
      <ClipLoader />
    </div>
  );
};

export default Loading;
