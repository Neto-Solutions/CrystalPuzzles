import { $host, $authHost } from '../../../shared/api/axios.instances';
import Cookies from 'js-cookie';

const authUser = async ({ username, password }) => {
	const formData = new FormData();
	formData.append('username', username);
	formData.append('password', password);

	const data = await $host
		.post('/auth/login', formData)
		.then((res) => Cookies.set('token', res.data.access_token, { expires: 1 }));
	return data;
};

const updateToken = async () => {
	const { data } = await $authHost
		.post('/auth/refresh-token')
		.then((res) => Cookies.set('token', res.data.access_token, { expires: 1 }));
	return data;
};

const logout = async () => {
	const { data } = await $authHost.post('/auth/logout');
	return data;
};

export { authUser, updateToken, logout };
