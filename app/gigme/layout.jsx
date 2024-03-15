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
  const { status } = useSession();
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
      if (
        err?.response?.statusText === "Unauthorized" &&
        !status === "authenticated"
      ) {
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
    <main className="min-h-[100vh] overflow-auto">
      <Nav />

      {children}
    </main>
  );
}
