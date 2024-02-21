import axios from 'axios';

export const LoginSlice = async (
	form,
	setLoading,
	setError,
	setSuccess,
	router,
) => {
	console.log(form);
	if (!form?.email || !form?.password) {
		setSuccess('');
		setError('Please fill in all fields');
		setTimeout(() => {
			setError('');
		}, 3000);
		return;
	}
	try {
		const res = await axios.post('/api/auth/login', form);
	} catch (error) {}

	console.log(form);
};
