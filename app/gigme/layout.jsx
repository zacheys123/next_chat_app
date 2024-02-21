'use client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function MainPageLayout({ children }) {
	const router = useRouter();
	const [isSuccess, setSuccess] = useState(false);
	useEffect(() => {
		(async () => {
			const { user, error } = await getUser();
			if (error) {
				router.push('/login');
				return;
			}
			setSuccess(true);
		})();
	}, [router]);
	if (!isSuccess) {
		return <Loading />;
	}
	return <main>{children}</main>;
}
async function getUser() {
	try {
		const { data } = await axios.get('/api/auth/protect');
		return { user: data, error: null };
	} catch (err) {
		return { user: null, error: err };
	}
}
