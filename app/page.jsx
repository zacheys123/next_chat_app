"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./Context/store";
import Nav from "@/components/Nav";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getUser } from "@/features/protectSlice";
import { global } from "@/reducerActions/authActions";
import { CiCirclePlus } from "react-icons/ci";
import { Button, Label, Select } from "flowbite-react";
import StartForm from "@/components/StartForm";
export default function Home() {
  const {
    authstate: { mainUser, isAuthenticated },
    setAuthState,
  } = useGlobalContext();
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, err } = await getUser();
      console.log(user);
      if (user) {
        setAuthState({
          type: global.AUTHENTICATE,
          payload: { isAuthenticated: true, mainUser: user },
        });
        setSuccess(true);
        return;
      }

      setAuthState({
        type: global.AUTHENTICATE,
        payload: { isAuthenticated: false, mainUser: user },
      });
    })();
  }, []);
  if (!isSuccess) {
    return <Loading />;
  }
  return (
    <main className="h-screen">
      <div className="sticky">
        {" "}
        <Nav userAuth={mainUser?.user} auth={isAuthenticated} />
      </div>
      <div className=" w-full min-h-screen flex bg-black">
        <div className="w-15 md:w-25 h-screen flex flex-col justify-center items-center ">
          <div className="bg-sky-500/60 h-50 rounded-y-3xl rounded-l-3xl p-[30px] ml-[20px]">
            {" "}
            <h1 className="text-white text-sm font-bold  md:text-4xl md:font-semibold">
              Welcome to GigMeUp
            </h1>
            <Button
              color="ghost"
              outline
              className="my-3 p-3 hover:text-white hover:bg-blue-800"
            >
              <CiCirclePlus className="mr-2 h-4 w-4 md:w-10 md:h-10" />
              <span className="md:text-3xl">Join us Now!!!</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 w-50 h-screen flex justify-center items-center">
          <div className="flex flex-col ">
            <StartForm />
          </div>
        </div>
      </div>
      {/* <footer className="bg-grey shadow-md ">&copy;GigMeUp 2024</footer> */}
    </main>
  );
}
