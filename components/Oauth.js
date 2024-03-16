"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useSession } from "next-auth/react";
const Oauth = () => {
  const { data: session } = useSession();
  const username = `${session?.user?.name.split(" ")[0]}@${session?.user?.name.split(" ")[1]}`;

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      className="px-2 w-full"
      onClick={() =>
        signIn("google", {
          callbackUrl: `http://localhost:3000`,
        })
      }
    >
      <FaGoogle className="mr-3" /> Signin with Google
    </Button>
  );
};

export default Oauth;
