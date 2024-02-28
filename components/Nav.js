import { Avatar } from "flowbite-react";
import Link from "next/link";
import { TfiAlignRight } from "react-icons/tfi";
import LandingButton from "./sub-components/LandingButton";
import RouteButton from "./RouteButton";
export default function Nav({ auth }) {
  return (
    <main className="flex bg-cyan-900 text-white items-center p-3 w-full md:justify-around justify-between bg-cyan-900">
      <RouteButton title="home" destination="/gigme">
        <div className="flex md:flex-start md:w-20 xl:-ml-[190px] md:-ml-[100px] cursor-pointer">
          {" "}
          <span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className="  font-bold p-1 shadow-blue-500">Up</span>
        </div>
      </RouteButton>
      {auth ? (
        <div>
          <div className="hidden md:inline  ">
            {" "}
            <Link className="hidden md:inline px-3" href="/">
              Home
            </Link>
            <Link className="hidden md:inline px-3" href="/dashboard">
              dashboard
            </Link>
            <Link className="hidden md:inline px-3" href="/settings">
              about
            </Link>
          </div>
          <Link className="hidden md:inline px-3" href="/contact">
            Contact
          </Link>
          <div className="hidden md:hidden">
            {" "}
            <Link href="/gigme">Home</Link>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/settings">settings</Link>{" "}
            <Link href="/gigme">Home</Link>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/settings">settings</Link>
          </div>
        </div>
      ) : (
        <div className="flex mx-3">
          <LandingButton title="SignIn" classbut=" mr-3 bg-blue-500" />
          <LandingButton title="SignUp" classbut=" mr-3" />
        </div>
      )}
      <div className="md:-mr-[120px]">
        {" "}
        <TfiAlignRight className="inline md:hidden w-5 h-5 mx-2 cursor-pointer hover:opacity-8 hover:bg-green" />
        <Avatar
          rounded
          className="rounded-lg hidden md:inline"
          status="online"
        />
      </div>
    </main>
  );
}
