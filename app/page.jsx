"use client";
import { CiCirclePlus } from "react-icons/ci";
import { Button, Label, Select } from "flowbite-react";
import StartForm from "@/components/StartForm";
import Nav from "@/components/Nav";
import ImageComponent from "@/components/ImageComponent";
import { FaArrowCircleRight } from "react-icons/fa";
import bgImage from "@/public/assets/bg-cover.jpg";
import RouteButton from "@/components/sub-components/RouteButton";
export default function Home() {
  return (
    <main className="h-screen">
      <ImageComponent bgCover={bgImage} />
      <div className="sticky">
        {" "}
        <Nav />
      </div>
      <div className="w-100  h-screen flex  justify-center items-center">
        <div>
          <h1 className="text-white p-4">
            <span className="text-7xl md:text-7xl bg-gradient-to-r  from-orange-600 via-green-500 to-purple-100 inline-block  text-transparent  bg-clip-text">
              chat
            </span>
            <span className=" text-7xl md:text-7xl md:font-bold bg-cyan-100 bg-clip-text text-transparent text-center">
              {" "}
              and{" "}
              <span className="text-7xl md:text-7xl  bg-gradient-to-r  from-yellow-400 via-green-300 to-purple-600 inline-block  text-transparent  bg-clip-text">
                connect
              </span>{" "}
              <span className="text-center">with every musician you know</span>
            </span>
            <p className="text-3xl font-poppins text-center mt-4">
              {" "}
              Welcome to GigMeUp
            </p>
          </h1>
          <RouteButton
            title="register"
            className="w-full flex items-center justify-center my-12"
            destination="/signup"
          >
            <button className="my-3 w-fit  text-white hover:text-white rounded-full p-4 bg-red-600 hover:bg-blue-800 flex items-center">
              <span className="md:text-3xl flex mx-3">
                Get Started{" "}
                <FaArrowCircleRight className="ml-3 h-4 w-4 md:w-10 md:h-10" />
              </span>
            </button>
          </RouteButton>
        </div>
      </div>
      {/* <footer className="bg-grey shadow-md ">&copy;GigMeUp 2024</footer> */}
    </main>
  );
}
