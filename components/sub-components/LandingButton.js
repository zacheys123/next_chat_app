"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const LandingButton = ({ title, classbut }) => {
  const router = useRouter();
  const onclickfunc = (ev) => {
    console.log(ev);
    if (ev.target.innerHTML === "SignIn") {
      router.push("/login");
    } else {
      return;
    }
  };
  return (
    <Button onClick={onclickfunc} className={classbut}>
      {title}
    </Button>
  );
};

export default LandingButton;
