"use client";
import React from "react";
import { useRouter } from "next/navigation";
const RouteButton = ({ title, destination, children }) => {
  const router = useRouter();
  const handleRouting = () => {
    if (title === "home") {
      router.push(destination);
    }
  };
  return <span onClick={handleRouting}>{children}</span>;
};

export default RouteButton;
