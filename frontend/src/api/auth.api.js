import { $host, $authHost } from './';
import Cookies from 'js-cookie';

const authUser = async (user) => {
	const { username, password } = user;
	const { data } = await $host.post('/auth/login', { username, password });
	Cookies.set('token', data.token);
	return data;
};

const updateToken = async () => {
	const { data } = await $authHost.post('/auth/refresh-token');
	Cookies.set('token', data.token);
	return data;
};

export { authUser, updateToken };
