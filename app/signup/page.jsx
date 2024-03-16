"use client";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser } from "@/features/protectSlice";
import Loading from "../gigme/Loading";
import { useEffect, useState } from "react";
import StartForm from "@/components/StartForm";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../Context/store";
import { useCallback } from "react";

const Register = () => {
  const { status, data: session } = useSession();
  console.log(status);
  const username = `${session?.user?.name.split(" ")[0]}@${session?.user?.name.split(" ")[1]}`;
  const {
    authstate: { authInfo, mainUser },
    setAuthState,
  } = useGlobalContext();

  const router = useRouter();
  const [id] = useState(() => {
    let valid = window?.localStorage.getItem("profile");
    if (!valid) {
      return null;
    }
    return JSON.parse(valid);
  });
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !id) {
      setSuccess(true);
      router.push("/signup");
      return;
    }

    router.push(`/gigme/${username}`);

    setSuccess(true);
    return;
  }, [id, username, setAuthState, router, status]);
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <main className="grid place-items-center h-screen  w-full bg-gray-200">
      <StartForm />
      <footer>@GigmeUp.com</footer>
    </main>
  );
};

export default Register;
