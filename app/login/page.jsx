'use client';
import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getUser } from '@/features/protectSlice';
import Loading from '../gigme/Loading';
const LoginPage = () => {
	const [isSuccess, setSuccess] = useState(false);
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const { user, err } = await getUser();
			console.log(user);
			if (user) {
				router.push('/gigme');
				return;
			}
			setSuccess(true);
		})();
	}, [router]);
	if (!isSuccess) {
		return <Loading />;
	}
	return (
		<main className="grid place-items-center h-screen  w-full">
			<nav></nav>
			<LoginForm />
		</main>
	);
};

export default LoginPage;
