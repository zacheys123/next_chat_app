export async function registerSlice(
	form,
	setError,
	setLoading,
	router,
) {
	if (
		!form?.fullname ||
		!form?.email ||
		!form?.username ||
		!form?.city ||
		!form?.password ||
		!form?.cpassword
	) {
		setError('Please fill all the fields');
		return;
	}

	try {
		setError('');
		setLoading(true);
		const res = await fetch(`api/auth/register`, {
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
			setError(data?.message);
			localStorage.setItem('token', JSON.stringify(token));
			localStorage.setItem('profile', JSON.stringify(result));
			setTimeout(() => {
				router.push('/mainpage/gigme');
			}, 3000);
		} else {
			setLoading(false);
			setError(data?.message);
		}
	} catch (error) {
		setLoading(false);
		if (error.message === 'Network Error') {
			setError(error.message);
			setLoading(false);
			setTimeout(() => {
				router.push('/');
			}, 4000);
		}
	}
}
