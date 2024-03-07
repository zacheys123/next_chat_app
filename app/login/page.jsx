"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { getUser } from "@/features/protectSlice";
import Loading from "../gigme/Loading";
import { useGlobalContext } from "../Context/store";
const LoginPage = () => {
  const {
    authstate: { isAuthenticated },
    setAuthState,
  } = useGlobalContext();
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (user) {
      setAuthState({
        type: global.AUTHENTICATE,
        payload: {
          isAuthenticated: true,
          authInfo: user,
          mainUser: user,
        },
      });
      router.push("/signup");

      return;
    }
    setSuccess(true);
    router.push("/login");
  }, []);
  if (!isSuccess) {
    return <Loading />;
  }
  return (
    <main className="grid place-items-center h-screen  w-full">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
