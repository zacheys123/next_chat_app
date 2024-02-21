'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Nav from '@/components/Nav';
import { getUser } from '@/features/protectSlice';

export default function MainPageLayout({ children }) {
	const router = useRouter();
	const [isSuccess, setSuccess] = useState(false);
	useEffect(() => {
		(async () => {
			const { user, err } = await getUser();
			console.log(user);
			if (err?.response?.statusText === 'Unauthorized') {
				router.push('/login');
				return;
			}
			setSuccess(true);
		})();
	}, [router]);
	if (!isSuccess) {
		return <Loading />;
	}
	return (
		<main>
			<div> </div>
			{children}
		</main>
	);
}
