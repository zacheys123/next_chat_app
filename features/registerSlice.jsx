export async function registerSlice(
	form,
	setError,
	setLoading,
	router,
	setSuccess,
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
			setError('');
			setSuccess(data?.message);

			setTimeout(() => {
				router.push('/gigme');
				localStorage.setItem('token', JSON.stringify(data?.token));
				localStorage.setItem('profile', JSON.stringify(data?.result));
			}, 3000);
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
		if (error.message === 'Network Error') {
			setSuccess('');
			setError(error.message);
			setLoading(false);
			setTimeout(() => {
				router.push('/');
			}, 4000);
		}
	}
}
