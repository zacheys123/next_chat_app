'use client';
import Link from 'next/link';
import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerSlice } from '@/features/registerSlice';
import { useRouter } from 'next/navigation';
const RegisterForm = () => {
	const [data, setData] = useState({
		fullname: '',
		email: '',
		city: '',
		username: '',
		password: '',
		cpassword: '',
	});
	const router = useRouter();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const handleInput = (ev) => {
		setData({ ...data, [ev.target.name]: ev.target.value });
	};
	const form_ref = useRef();
	useEffect(() => {
		form_ref.current = data;
	}, []);

	const [pass, setPass] = useState(false);
	const [cpass, setCpass] = useState(false);
	const handleSubmit = (ev) => {
		ev.preventDefault();
		registerSlice(data, setError, setLoading, router);
	};

	return (
		<div className="shadow-lg rounded-lg p-5 first:border-t-4 border-green-400 ">
			<h1 className="text-xl font-bold text-center">
				Enter Register Details
			</h1>{' '}
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				<input
					onChange={handleInput}
					type="text"
					value={data?.fullname}
					name="fullname"
					placeholder="Enter Full Name"
				/>
				<input
					type="text"
					value={data?.email}
					name="email"
					onChange={handleInput}
					placeholder="Enter Email"
				/>
				<input
					type="text"
					value={data?.city}
					onChange={handleInput}
					name="city"
					placeholder="Enter City"
				/>
				<input
					type="text"
					value={data?.username}
					name="username"
					onChange={handleInput}
					placeholder="Enter Username"
				/>
				<div className="flex gap-2 align-center">
					<input
						type={!pass ? 'password' : 'text'}
						name="password"
						value={data?.password}
						onChange={handleInput}
						placeholder="Enter Password"
					/>
					{pass ? (
						<VisibilityIcon
							sx={{ cursor: 'pointer' }}
							onClick={() => setPass(false)}
						/>
					) : (
						<VisibilityOffIcon
							sx={{ cursor: 'pointer' }}
							onClick={() => setPass(true)}
						/>
					)}{' '}
				</div>{' '}
				<div className="flex gap-2 align-center">
					<input
						type={!cpass ? 'password' : 'text'}
						value={data?.cpassword}
						name="cpassword"
						onChange={handleInput}
						placeholder="Confirm  Password"
					/>
					{cpass ? (
						<VisibilityIcon
							sx={{ cursor: 'pointer' }}
							onClick={() => setCpass(false)}
						/>
					) : (
						<VisibilityOffIcon
							sx={{ cursor: 'pointer' }}
							onClick={() => setCpass(true)}
						/>
					)}{' '}
				</div>{' '}
				<button
					type="submit"
					className="w-100 py-2 rounded-md text-white bg-blue-500"
				>
					{!loading ? 'Register' : 'Adding User...'}
				</button>
				{error && (
					<div
						className="bg-red-500  0 text-sm w-fit
          p-1 text-white md:text-white -500 mt-2"
					>
						{error}
					</div>
				)}
				<div className="text-right text-sm mt-2">
					<span> Already have an Account,</span>
					<Link href={'/'}>Login here!!!</Link>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;

/* "use client";
import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerSlice } from "@/features/registerSlice";
const RegisterForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form_ref = useRef();

  const [pass, setPass] = useState(false);
  const [cpass, setCpass] = useState(false);
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    let data = { fullname, email, city, address, password, cpassword };
    registerSlice(data, setError, setLoading);
  }, []);

  return (
    <div className="shadow-lg rounded-lg p-5 first:border-t-4 border-green-400 ">
      <h1 className="text-xl font-bold text-center">Enter Register Details</h1>{" "}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(ev) => setFullname(ev.target.value)}
          type="text"
          value={fullname}
          name="fullname"
          placeholder="Enter Full Name"
        />
        <input
          type="text"
          value={email}
          name="email"
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Enter Email"
        />
        <input
          type="text"
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
          name="city"
          placeholder="Enter City"
        />
        <input
          type="text"
          value={address}
          name="address"
          onChange={(ev) => setAddress(ev.target.vale)}
        />
        <div className="flex gap-2 align-center">
          <input
            type={!pass ? "password" : "text"}
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
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
            type={!cpass ? "password" : "text"}
            value={cpassword}
            name="cpassword"
            onChange={(ev) => setCpassword(ev.target.value)}
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
        <button
          type="submit"
          className="w-100 py-2 rounded-md text-white bg-blue-500"
        >
          {!loading ? "Register" : "Adding User..."}
        </button>
        {error && (
          <div
            className="bg-red-500  0 text-sm w-fit
          p-1 text-white md:text-red-500 mt-2"
          >
            {error}
          </div>
        )}
        <div className="text-right text-sm mt-2">
          <span> Already have an Account,</span>
          <Link href={"/"}>Login here!!!</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
*/
