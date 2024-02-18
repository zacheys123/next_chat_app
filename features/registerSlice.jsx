const api = 'http://localhost:5000';
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
	console.log(form);
	try {
		setError('');
		setLoading(true);
		const res = await fetch(`api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		});
		const data = await res.json();

		if (res.ok) {
			setLoading(false);
			const form = e.target;
			form.reset();

			setError(data?.message);

			router.push('/gigme');
		} else {
			setLoading(false);
			console.log('user registration failed');
		}
	} catch (error) {
		if (error.message === 'Network Error') {
			setError(error.message);
			setLoading(false);
			setTimeout(() => {
				router.push('/');
			}, 4000);
		}
	}
}
