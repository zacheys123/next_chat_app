export const LoginSlice = async (
	form,
	setLoading,
	setError,
	setSuccess,
	router,
) => {
	if (!form?.username || !form?.email || !form?.password) {
		setError('Please fill in all fields');
		return;
	}
	console.log(form);
};
