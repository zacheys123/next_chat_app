const { default: axios } = require('axios');

export async function getUser() {
	try {
		const { data } = await axios.get('/api/auth/protect');

		return { user: data, error: null };
	} catch (err) {
		return { user: null, err };
	}
}
