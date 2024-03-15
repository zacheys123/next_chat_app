"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const Oauth = () => {
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      className="px-2 w-full"
      onClick={() => signIn("google")}
    >
      <FaGoogle className="mr-3" /> Signin with Google
    </Button>
  );
};

export default Oauth;
