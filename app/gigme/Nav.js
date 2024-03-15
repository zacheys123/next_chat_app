import RouteButton from "@/components/sub-components/RouteButton";
import React from "react";
import { FaHome } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className=" top-0 flex py-1 justify-between items-center">
      <RouteButton title="home" destination="/gigme">
        <div className="flex md:w-20 xl:-ml-[190px]cursor-pointer">
          {" "}
          <span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className="  font-bold p-1 shadow-blue-500">Up</span>
        </div>
      </RouteButton>
      <div>
        <FaHome />
      </div>
    </nav>
  );
};

export default Nav;
