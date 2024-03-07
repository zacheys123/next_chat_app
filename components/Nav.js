"use client";
import { Avatar, Dropdown } from "flowbite-react";
import Link from "next/link";
import { TfiAlignRight } from "react-icons/tfi";
import LandingButton from "./sub-components/LandingButton";
import RouteButton from "./sub-components/RouteButton";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/store";
import Loading from "@/app/Loading";
import { useEffect, useState } from "react";
import { getUser } from "@/features/protectSlice";
export default function Nav({ user, auth }) {
  return (
    <main className="flex bg-cyan-900 text-white items-center p-2 w-full md:justify-around justify-between bg-cyan-900">
      <RouteButton title="home" destination="/gigme">
        <div className="flex md:flex-start md:w-20 xl:-ml-[190px] md:-ml-[100px] cursor-pointer">
          {" "}
          <span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className="  font-bold p-1 shadow-blue-500">Up</span>
        </div>
      </RouteButton>

      <div>
        <div className="hidden md:inline  ">
          {" "}
          <Link className="navLinks hidden md:inline px-3" href="/">
            Home
          </Link>
          <Link className="navLinks hidden md:inline px-3" href="/dashboard">
            dashboard
          </Link>
          <Link className="navLinks hidden md:inline px-3" href="/settings">
            about
          </Link>
        </div>
        <Link className="navLinks hidden md:inline px-3" href="/contact">
          Contact
        </Link>
        <div className="hidden md:hidden">
          {" "}
          <Link href="/gigme">Home</Link>
          <Link href="/dashboard">dashboard</Link>
          <Link href="/settings">settings</Link> <Link href="/gigme">Home</Link>
          <Link href="/dashboard">dashboard</Link>
          <Link href="/settings">settings</Link>
        </div>
      </div>

      <div className="md:-mr-[120px] z-40">
        {" "}
        <Dropdown
          label={
            <>
              <TfiAlignRight className="inline md:hidden w-5 h-5 mx-2 cursor-pointer hover:opacity-8 hover:bg-green" />
              <Avatar alt={user?.firstname.split("")[0]} rounded />
            </>
          }
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.firstname}</span>
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
