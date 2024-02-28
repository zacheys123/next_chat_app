'use client';
import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getUser } from '@/features/protectSlice';
import Loading from '../gigme/Loading';
import { useGlobalContext } from '../Context/store';
const LoginPage = () => {
	const{authstate:{isAuthenticated}}=useGlobalContext()
	const [isSuccess, setSuccess] = useState(false);
	const router = useRouter();
	useEffect(() => {
		
			if (!isAuthenticated) {
				router.push('/login');
				setSuccess(true);
				return;
			}
		router.push('/')
		
		
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
