"use client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Nav from "@/components/Nav";
import { getUser } from "@/features/protectSlice";
import { useGlobalContext } from "../Context/store";
import { global } from "@/reducerActions/authActions";

export default function MainPageLayout({ children }) {
  const {
    authstate: { authInfo, mainUser },
    setAuthState,
  } = useGlobalContext();

  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);
  useEffect(() => {
    (async () => {
      const { user, err } = await getUser();
      console.log(user);
      if (err?.response?.statusText === "Unauthorized") {
        setAuthState({
          type: global.AUTHENTICATE,
          payload: { isAuthenticated: false, authInfo: user },
        });

        router.push("/login");
        return;
      }
      setAuthState({
        type: global.AUTHENTICATE,
        payload: { isAuthenticated: true, authInfo: user },
      });
      setSuccess(true);
    })();
  }, [router]);
  if (!isSuccess) {
    return <Loading />;
  }
  return (
    <main className="bg-black">
      <div className="text-white text-3xl">{mainUser?.fullname}</div>
      {children}
    </main>
  );
}
