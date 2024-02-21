'use client';
import { FaGoogle } from 'react-icons/fa';
import { Alert, Button, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';

import { Toast } from 'flowbite-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
const LoginForm = () => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState(false);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	('');
	const router = useRouter();
	const form = { email, username, password };
	const handleLogin = useCallback((ev) => {
		ev.preventDefault();
		loginSlice(form, setLoading, setError, setSuccess, router);
	}, []);
	return (
		<div className="grid place-items-center h-screen w-full relative bg-grey-500">
			{success && (
				<div className="absolute w-full h-screen/2 top-[140px] -mr-[100px] -md:-mr-[2930px] md:h-screen">
					<Toast className="bg-green-300">
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-green-500 dark:bg-green-800 dark:text-green-200">
							<HiCheck className="h-5 w-5" />
						</div>
						<div className="m-3 text-sm font-normal ">{success}</div>
						<Toast.Toggle />
					</Toast>
				</div>
			)}
			<div className="shadow-lg rounded-lg p-5 border-t-4 border-green-400 md:w-[500px]">
				<h1 className="text-center font-bold text-black-500">
					Sign In
				</h1>
				<form
					className="flex flex-col gap-3 py-6 px-3"
					onSubmit={handleLogin}
				>
					<TextInput
						className="border-grey-300 rounded-lg focus:outline-none"
						type="email"
						placeholder="Enter Email"
						onChange={(ev) => setEmail(ev.target.value)}
						value={email}
					/>
					<div className="flex gap-2 align-center my-3 border border-grey-300 rounded-lg w-full p-1">
						<input
							className="border-none outline-0 w-full focus:ring-0 "
							required
							type={!pass ? 'password' : 'text'}
							name="password"
							onChange={(ev) => setPassword(ev.target.value)}
							value={password}
							placeholder="Enter Password"
						/>
						<div className="mt-1">
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
						</div>
					</div>{' '}
					<Button
						disabled={loading}
						gradientMonochrome="info"
						className="mb-3"
					>
						Sign In
					</Button>
					<Button
						gradientDuoTone="pinkToOrange"
						disabled={loading}
						className="px-2"
					>
						<FaGoogle /> Signin with Google
					</Button>
					{error && (
						<Alert color="failure" icon={HiInformationCircle}>
							{error}
						</Alert>
					)}
					<span className="text-sm text-right mt-3">
						<span>Don't have an account,</span>
						<Link className="underline" href={'/signup'}>
							Register here
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
