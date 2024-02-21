'use client';
import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser } from '@/features/protectSlice';
import Loading from '../gigme/Loading';
import { useEffect, useState } from 'react';
const Register = () => {
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
			<RegisterForm />
		</main>
	);
};

export default Register;
