"use client";
import Link from "next/link";
import RouteButton from "./sub-components/RouteButton";
import UserAvatar from "./UserAvatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Nav() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [id] = useState(() => {
    let valid = window.localStorage.getItem("profile");
    if (!valid) {
      return null;
    }
    return JSON.parse(valid);
  });
  return (
    <main className="flex bg-cyan-800 text-white items-center p-2 w-[100vw] md:justify-around justify-between bg-cyan-900">
      <RouteButton title="home" destination="/gigme">
        <div className="flex md:flex-start md:w-20 xl:-ml-[190px] md:-ml-[100px] cursor-pointer">
          {" "}
          <span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className="  font-bold p-1 shadow-blue-500">Up</span>
        </div>
      </RouteButton>
      {status === "authenticated" || id ? (
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
            <Link href="/settings">settings</Link>{" "}
            <Link href="/gigme">Home</Link>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/settings">settings</Link>
          </div>
        </div>
      ) : (
        <div className="flex w-50 px-3">
          {" "}
          <Button
            color="light"
            pill
            className=" mr-4 text-black text-3xl w-25"
            onClick={() => signIn("google")}
          >
            SignIn
          </Button>
          <Button
            className="bg-yellow-700 text-white text-3xl w-25"
            onClick={() => router.push("/signup")}
          >
            SignUp
          </Button>
        </div>
      )}
      {session && <UserAvatar session={session} signOut={signOut} />}{" "}
      {id && <UserAvatar id={id} />}
    </main>
  );
}
