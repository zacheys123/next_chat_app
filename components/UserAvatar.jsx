"use client";
import { Avatar, Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TfiAlignRight } from "react-icons/tfi";

const UserAvatar = ({ session, signOut, id }) => {
  console.log(session?.user);
  const user = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let val = window.localStorage.getItem("profile");
      if (!val) {
        return null;
      }
      return JSON.parse(val);
    }
  };
  const router = useRouter();
  console.log(user());
  return (
    <div className="md:-mr-[120px] z-40">
      <Dropdown
        label={
          <>
            <TfiAlignRight className="inline md:hidden w-5 h-5 mx-2 cursor-pointer hover:opacity-8 hover:bg-green" />
            {!id ? (
              <Image
                src={session?.user?.image}
                alt="image"
                width={30}
                height={30}
                className="rounded-full mr-4 md:ml-[15px]  w-30 h-30 md:w-30 md:h-30 xl:w-34 xl:h-34"
              />
            ) : (
              <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-yellow-300 rounded-full dark:bg-gray-600 mr-2">
                <span class=" text-gray-600 font-bold dark:text-gray-300">
                  {id?.firstname.split("")[0].toUpperCase()}
                </span>
              </div>
            )}
          </>
        }
        arrowIcon={false}
        inline
      >
        <Dropdown.Header>
          <span className="block text-sm text-red-500 font-bold">
            {user()?.firstname || session?.user?.name}
          </span>
          <span className="block truncate text-sm font-bold text-cyan-400">
            {user()?.email || session?.user?.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item onClick={() => router.push(`/profile/`)}>
          Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        {!id ? (
          <Dropdown.Item
            onClick={async () => {
              signOut();
              if (typeof window !== "undefined" && window.localStorage) {
                window?.localStorage.removeItem("profile");
                window?.localStorage.removeItem("token");
              }
              const res = await fetch("/api/auth/logout");
              let data = await res.json();
              console.log(res);
            }}
          >
            Sign out
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            onClick={() => {
              if (typeof window !== "undefined" && window.localStorage) {
                window?.localStorage.removeItem("profile");
                window?.localStorage.removeItem("token");
                router.push("/login");
              }
            }}
          >
            Logout
          </Dropdown.Item>
        )}
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
