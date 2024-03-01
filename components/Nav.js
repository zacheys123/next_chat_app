"use client";
import { Avatar, Dropdown } from "flowbite-react";
import Link from "next/link";
import { TfiAlignRight } from "react-icons/tfi";
import LandingButton from "./sub-components/LandingButton";
import RouteButton from "./RouteButton";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/store";
import Loading from "@/app/Loading";
import { useEffect, useState } from "react";
import { getUser } from "@/features/protectSlice";
export default function Nav() {
  const {
    authstate: { authInfo, mainUser, isAuthenticated },
    setAuthState,
  } = useGlobalContext();
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, err } = await getUser();
      const userName = JSON.parse(localStorage.getItem("profile"));
      console.log(user);
      if (user) {
        setAuthState({
          type: global.AUTHENTICATE,
          payload: {
            isAuthenticated: true,
            authInfo: user,
            mainUser: userName,
          },
        });
        setSuccess(true);
        return;
      }

      setAuthState({
        type: global.AUTHENTICATE,
        payload: { isAuthenticated: false, authInfo: user },
      });
    })();
  }, []);
  if (!isSuccess) {
    return <Loading />;
  }
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
      {isAuthenticated ? (
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
        </div>
      )}
      <div className="md:-mr-[120px] Z-index-999">
        {" "}
        <Dropdown
          label={
            <>
              <TfiAlignRight className="inline md:hidden w-5 h-5 mx-2 cursor-pointer hover:opacity-8 hover:bg-green" />
              <Avatar
                alt={mainUser?.fullname.split("")[0]}
                img="/images/people/profile-picture-5.jpg"
                rounded
              />
            </>
          }
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.fullname}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </main>
  );
}
