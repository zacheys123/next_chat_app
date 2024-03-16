"use client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Nav from "./Nav";
import { getUser } from "@/features/protectSlice";
import { useGlobalContext } from "../Context/store";
import { global } from "@/reducerActions/authActions";
import { useSession } from "next-auth/react";
export default function MainPageLayout({ children }) {
  const { status, data: session } = useSession();
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
  const username = `${session?.user?.name.split(" ")[0]}@${session?.user?.name.split(" ")[1]}`;

  useEffect(() => {
    if (status === "unauthenticated" && !id) {
      setSuccess(true);
      router.push("/signup");
      return;
    }

    setSuccess(true);
    return () => {
      const routerFunc = () => {
        if (id) {
          return `/gigme/${id?.username}`;
        }
        return `/gigme/${username}`;
      };
      router.push(routerFunc());
    };
  }, [id, username, setAuthState, router, status]);
  if (!isSuccess) {
    return <Loading />;
  }
  return (
    <main className="min-h-[100vh] overflow-auto">
      <Nav />

      {children}
    </main>
  );
}
