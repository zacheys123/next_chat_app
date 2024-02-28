'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Nav from '@/components/Nav';
import { getUser } from '@/features/protectSlice';
import { useGlobalContext } from '../Context/store';
import { global } from '@/reducerActions/authActions';





export default function MainPageLayout({ children }) {
	const{authstate:{mainUser},setAuthState} = useGlobalContext()
	
	const router = useRouter();
	const [isSuccess, setSuccess] = useState(false);
	useEffect(() => {
		(async () => {
			const { user, err } = await getUser();
			console.log(user);
			if (err?.response?.statusText === 'Unauthorized') {
				setAuthState({type:global.AUTHENTICATE,payload:{isAuthenticated:false,mainUser:user}})
	
				router.push('/login');
				return;
			}
			setAuthState({type:global.AUTHENTICATE,payload:{isAuthenticated:true,mainUser:user}})
			setSuccess(true);
	
		})();
	}, [router]);
	if (!isSuccess) {
		return <Loading />;
	}
	return (
		<main>
			<div></div>
			{children}
		</main>
	);
}
