'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	return (
		<div className="grid place-items-center h-screen ">
			<div className="shadow-lg rounded-lg p-5 border-t-4 border-green-400 ">
				<h1 className="text-center font-bold text-black-500">
					Sign In
				</h1>
				<form className="flex flex-col gap-3 p-3">
					<input type="text" placeholder="Enter Email" />
					<input type="password" placeholder="Enter Password" />

					<button
						disabled={loading}
						className={` bg-green-600 text-white font-bold cursor-pointer px-6 py-2`}
					>
						Login
					</button>
					<button
						disabled={loading}
						className="bg-red-700 text-white w-100 py-2 "
					>
						Signin with Google
					</button>
					{error && (
						<div
							className="bg-red-50  0 text-sm w-fit
          p-1 text-white md:text-red-500 mt-2"
						>
							{error}
						</div>
					)}
					<span className="text-sm text-right mt-3">
						<span>Don't have an account,</span>
						<Link className="underline" href={'/register'}>
							Register here
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Login;
