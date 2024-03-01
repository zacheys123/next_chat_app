"use client";
import React from "react";
import { useRouter } from "next/navigation";
const RouteButton = ({ className, title, destination, children }) => {
  const router = useRouter();
  const handleRouting = () => {
    if (title === "home") {
      router.push(destination);
    } else if (title === "login") {
      router.push(destination);
    }
  };
  return (
    <span className={className} onClick={handleRouting}>
      {children}
    </span>
  );
};

export default RouteButton;
