"use client";
import { Alert, Button, Label, Select, Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FaGoogle } from "react-icons/fa";
import RouteButton from "./RouteButton";
import { registerSlice } from "@/features/registerSlice";
import { useRouter } from "next/navigation";

const StartForm = () => {
  const router = useRouter();
  const [instrument, setSelectedInstrument] = useState("");
  const [experience, setSelectedExperience] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userdata, setData] = useState({
    firstname: "",
    secondname: "",
    city: "",
    age: "",
    phone: "",
    email: "",
    email2: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(false);

  const [cpass, setCpass] = useState(false);
  const handleInput = (ev) => {
    setData({ ...userdata, [ev.target.name]: ev.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const newdata = { ...userdata, experience, instrument };

    registerSlice(newdata, setError, setLoading, router, setSuccess);
  };
  const form_ref = useRef();
  useEffect(() => {
    form_ref.current = userdata;
  }, []);

  return (
    <form className="px-3 py-3 w-full bg-red-500 md:w-[450px]">
      <h1 className="text-xl font-bold text-center mb-2 text-white">
        Register here
      </h1>
      <div className="flex flex-col gap-3 py-6 px-3">
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="firstname"
          value={userdata?.firstname}
          placeholder="Firstname"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="secondname"
          value={userdata?.secondname}
          placeholder="Second Name"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="email"
          value={userdata?.email}
          placeholder="Email Address "
        />
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label
              htmlFor="city"
              value="Instrument of Choice"
              className="text-white"
            />
          </div>
          <Select
            id="instruments"
            required
            value={instrument}
            name="instrument"
            onChange={(e) => setSelectedInstrument(e.target.value)}
          >
            <option value="piano">Piano</option>
            <option value="guitar">Guitar</option>
            <option value="drums">Drums</option>
            <option value="bass">Bass Guitar</option>
            <option value="perc">Percussion</option>
            <option value="saxophone">Saxophone</option>
            <option value="trumpet">Trumpet</option>
            <option value="flute">Flute</option>
            <option value="clarinet">Clarinet</option> <option>Ukulele</option>
          </Select>
        </div>
        <div className="max-w-md">
          <Select
            onChange={(e) => setSelectedExperience(e.target.value)}
            id="experience"
            required
            value={experience}
            name="experience"
          >
            <option value="ten">10yrs -above</option>
            <option value="five">5yrs -10yrs</option>
            <option value="two">2yrs</option>
            <option value="less">less than 2yrs</option>
            <option value="noExp">No Experience</option>
          </Select>
        </div>
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="age"
          value={userdata?.age}
          placeholder="Age"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="city"
          value={userdata?.city}
          placeholder="Current City"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="phone"
          value={userdata?.phone}
          placeholder="Phone No"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="email2"
          value={userdata?.email2}
          placeholder="Email Address 2"
        />
        <input
          className="w-100 focus:ring-0"
          type="text"
          onChange={handleInput}
          name="username"
          value={userdata?.username}
          placeholder="username"
        />
        <div className="flex gap-2 align-center">
          <input
            className="border-b-4 border-cyan-600 focus:ring-0 border-transparent focus:border-transparent"
            required
            type={!pass ? "password" : "text"}
            name="password"
            value={userdata?.password}
            onChange={handleInput}
            placeholder="Enter Password"
          />
          {pass ? (
            <VisibilityIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setPass(false)}
            />
          ) : (
            <VisibilityOffIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setPass(true)}
            />
          )}{" "}
        </div>{" "}
        <div className="flex gap-2 align-center">
          <input
            className="border-b-4 border-cyan-600 focus:ring-0 border-transparent focus:border-transparent"
            required
            type={!cpass ? "password" : "text"}
            value={userdata?.cpassword}
            name="cpassword"
            onChange={handleInput}
            placeholder="Confirm  Password"
          />
          {cpass ? (
            <VisibilityIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setCpass(false)}
            />
          ) : (
            <VisibilityOffIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setCpass(true)}
            />
          )}{" "}
        </div>{" "}
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" icon={TiTick}>
            {success}
          </Alert>
        )}
      </div>
      <Button
        disabled={loading}
        gradientMonochrome="info"
        className="mb-3 w-full"
        type="submit"
        onClick={handleUpdate}
      >
        {!loading ? "Sign Up" : <Spinner color="info" />}
      </Button>
      <Button
        type="button"
        color="ghost"
        className="px-2 w-full"
        gradientMonochrome="success"
      >
        <FaGoogle className="mr-3 text-red-600 font-bold" /> Signin with Google
      </Button>{" "}
      <div className="w-100 text-center my-[10px]">
        <RouteButton
          title="login"
          destination="/login"
          className="cursor-pointer "
        >
          <span className="text-gray-700 hover:opacity-50 hover:underline">
            {" "}
            Already have an Account,
          </span>
          <span className="text-purple-500 font-bold hover:opacity-50 hover:underline">
            Login here!!!
          </span>
        </RouteButton>
      </div>
    </form>
  );
};

export default StartForm;