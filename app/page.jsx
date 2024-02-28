'use client'
import { useRouter } from 'next/navigation';
import { useGlobalContext } from './Context/store';
import Nav from '@/components/Nav';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import { getUser } from '@/features/protectSlice';
import { global } from '@/reducerActions/authActions';

export default function Home() {
	const {authstate:{mainUser,isAuthenticated},setAuthState} = useGlobalContext()
	const [isSuccess, setSuccess] = useState(false);
	const router = useRouter();
	
	useEffect(() => {
		(async () => {
			const { user, err } = await getUser();
			console.log(user);
			if (user) {
				setAuthState({type:global.AUTHENTICATE,payload:{isAuthenticated:true,mainUser:user}})
				setSuccess(true);
				return;
			}
		
			setAuthState({type:global.AUTHENTICATE,payload:{isAuthenticated:false,mainUser:user}})
			
		})();
	}, []);
	if (!isSuccess) {
		return <Loading />;
	}
	return (
		<main>
			<div>
				{' '}
				<Nav userAuth={mainUser?.user} auth={isAuthenticated} />
			</div>
			Welcome to Homepage
		</main>
	);
}
