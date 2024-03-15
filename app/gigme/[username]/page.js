import React from "react";
import axios from "axios";
const Social = async () => {
  return (
    <div className="bg-gray-200 h-screen flex w-100 ">
      <div className="bg-slate-800 h-100 hidden md:w-80"></div>
      <div className=" h-100 overflow-y-auto flex-1"></div>
      <div className="bg-green-800 h-100 hidden md:w-60"></div>
    </div>
  );
};

export default Social;
