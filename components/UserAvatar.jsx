"use client";
import { Avatar, Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TfiAlignRight } from "react-icons/tfi";

const UserAvatar = ({ session, signOut }) => {
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

            <Image
              src={session?.user?.image}
              alt="image"
              width={30}
              height={30}
              className="rounded-full  w-30 h-30 md:w-30 md:h-30 xl:w-34 xl:h-34"
            />
          </>
        }
        arrowIcon={false}
        inline
      >
        <Dropdown.Header>
          <span className="block text-sm">
            {user()?.firstname || session?.user?.name}
          </span>
          <span className="block truncate text-sm font-medium">
            {user()?.email || session?.user?.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item onClick={() => router.push("/profile")}>
          profile
        </Dropdown.Item>
        <Dropdown.Divider />
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
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
