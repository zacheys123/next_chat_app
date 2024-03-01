import Nav from "@/components/Nav";
import { getUser } from "@/features/protectSlice";
import { global } from "@/reducerActions/authActions";
import { CiCirclePlus } from "react-icons/ci";
import { Button, Label, Select } from "flowbite-react";
import StartForm from "@/components/StartForm";
export default function Home() {
  return (
    <main className="h-screen">
      <div className="sticky">
        {" "}
        <Nav />
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
        <div className="flex-1 w-full h-screen flex justify-center items-center relative">
          <StartForm />
        </div>
      </div>
      {/* <footer className="bg-grey shadow-md ">&copy;GigMeUp 2024</footer> */}
    </main>
  );
}
