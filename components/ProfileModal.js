"use client";
import {
  Alert,
  Button,
  Card,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FaGoogle } from "react-icons/fa";
import RouteButton from "./sub-components/RouteButton";
import { registerSlice } from "@/features/registerSlice";
import { useRouter } from "next/navigation";
import { TiTick } from "react-icons/ti";
import { FormGroup } from "@mui/material";
import { useGlobalContext } from "@/app/Context/store";
const ProfileModal = ({}) => {
  const {
    authstate: { errormessage, successmessage },
    setAuthState,
  } = useGlobalContext();
  const router = useRouter();
  const [instrument, setSelectedInstrument] = useState("Piano");
  const [experience, setSelectedExperience] = useState("noExp");
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
    other: "",
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

    registerSlice(
      newdata,
      setError,
      setLoading,
      router,
      setSuccess,
      setAuthState
    );
  };
  const form_ref = useRef();
  useEffect(() => {
    form_ref.current = userdata;
  }, [userdata]);

  const [otherinput, setOther] = useState(true);

  const [openModal, setOpenModal] = useState(true);

  function onCloseModal() {
    setOpenModal(false);
    router.back();
  }
  return (
    <Modal dismissible show={openModal} size="lg" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form className="px-3 py-3 w-full dark:bg-red-300 md:w-[450px]">
          <h1 className="text-xl font-bold text-center mb-2 text-zinc">
            Register here
          </h1>
          <div className="flex flex-col gap-3 py-6 px-3">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                className="w-100 focus:ring-0 mb-2 placeholder-gray-400 rounded-sm"
                type="text"
                onChange={handleInput}
                name="firstname"
                value={userdata?.firstname}
                placeholder="Firstname"
              />
              <TextInput
                className="w-100 focus:ring-0 mb-2"
                type="text"
                onChange={handleInput}
                name="secondname"
                value={userdata?.secondname}
                placeholder="Second Name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                className="w-100 focus:ring-0 mb-2 placeholder-gray-400 rounded-sm"
                type="text"
                onChange={handleInput}
                name="email"
                value={userdata?.email}
                placeholder="Email Address "
              />{" "}
              <TextInput
                className="w-100 focus:ring-0 mb-2"
                type="text"
                onChange={handleInput}
                name="age"
                value={userdata?.age}
                placeholder="Age"
              />
            </div>{" "}
            <TextInput
              className="w-100 focus:ring-0 mb-2"
              type="text"
              onChange={handleInput}
              name="city"
              value={userdata?.city}
              placeholder="Current City"
            />
            <TextInput
              className="w-100 focus:ring-0 mb-2"
              type="text"
              onChange={handleInput}
              name="phone"
              value={userdata?.phone}
              placeholder="Phone No"
            />
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <TextInput
                className="w-100 focus:ring-0 mb-2"
                type="text"
                onChange={handleInput}
                name="email2"
                value={userdata?.email2}
                placeholder="Email Address 2"
              />
              <TextInput
                className="w-100 focus:ring-0 mb-2"
                type="text"
                onChange={handleInput}
                name="username"
                value={userdata?.username}
                placeholder="username"
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="city"
                  value="Instrument of Choice"
                  className="text-zinc"
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
                <option value="clarinet">Clarinet</option>{" "}
                <option>Ukulele</option>
                <option onClick={() => setOther(true)}>Other...</option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="experience"
                  value="Experience"
                  className="text-zinc"
                />
              </div>
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
              {otherinput && (
                <Textarea
                  name="other"
                  value={userdata.other}
                  onChange={handleInput}
                  placeholder="Other Instrument /instruments..."
                  required
                  rows={4}
                  className="resize-none mt-3"
                ></Textarea>
              )}
            </div>
            <div className="flex gap-2 align-center">
              <TextInput
                className="border-b-4  border-cyan-600 focus:ring-0 mb-2 border-transparent focus:border-transparent w-full"
                required
                type={!pass ? "password" : "text"}
                name="password"
                value={userdata?.password}
                onChange={handleInput}
                placeholder="Enter Password"
                style={{ resize: "none" }}
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
              <TextInput
                className="border-b-4 border-cyan-600 focus:ring-0 mb-2 border-transparent focus:border-transparent w-full"
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
            {errormessage && (
              <Alert color="failure" icon={HiInformationCircle}>
                {errormessage}
              </Alert>
            )}
            {successmessage && (
              <Alert color="success" icon={TiTick}>
                {successmessage}
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
            <FaGoogle className="mr-3 text-red-600 font-bold" /> Signin with
            Google
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
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
