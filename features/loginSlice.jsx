import axios from 'axios';

export const LoginSlice = async (
	form,
	setLoading,
	setError,
	setSuccess,
	router,
) => {
	try {
		setLoading(true);
		setError('');
		const res = await fetch(`api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		});
		const data = await res.json();
		console.log(data);
		if (res.ok) {
			setLoading(false);
			setError('');
			setSuccess(data?.message);

			router.push('/gigme');
			localStorage.setItem('token', JSON.stringify(data?.token));
			localStorage.setItem('profile', JSON.stringify(data?.results));
		} else {
			setLoading(false);
			setSuccess('');
			setTimeout(() => {
				setError('');
			}, 4000);
			setError(data?.message);
		}
	} catch (error) {
		setLoading(false);
	}
};
