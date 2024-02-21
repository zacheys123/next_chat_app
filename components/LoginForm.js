'use client';
import { FaGoogle } from 'react-icons/fa';
import { Alert, Button, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';

import { Toast } from 'flowbite-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { HiCheck, HiInformationCircle } from 'react-icons/hi';
import { LoginSlice } from '@/features/loginSlice';
const LoginForm = () => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState(false);
	const [formdata, setFormData] = useState({
		email: '',
		password: '',
	});

	('');
	const router = useRouter();
	const formref = useRef();
	const handleInput = (ev) => {
		setFormData({ ...formdata, [ev.target.name]: ev.target.value });
	};
	const handleLogin = useCallback((ev) => {
		ev.preventDefault();

		LoginSlice(formdata, setLoading, setError, setSuccess, router);
	}, []);
	useEffect(() => {
		formref.current = formdata;
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
						name="email"
						placeholder=" example@gmail.com"
						onChange={handleInput}
						value={formdata?.email}
					/>
					<div className="flex gap-2 align-center my-3 border border-grey-300 rounded-lg w-full p-1">
						<input
							className="border-none outline-0 w-full focus:ring-0 "
							type={!pass ? 'password' : 'text'}
							name="password"
							onChange={handleInput}
							value={formdata?.password}
							placeholder="************"
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
						type="submit"
					>
						Sign In
					</Button>
					<Button
						type="button"
						gradientDuoTone="pinkToOrange"
						disabled={loading}
						className="px-2"
					>
						<FaGoogle className="mr-3" /> Signin with Google
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
