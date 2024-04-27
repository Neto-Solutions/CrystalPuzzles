import { $host, $authHost } from './';

const authUser = async (user) => {
	const { username, password } = user;
	const { data } = await $host.post('/auth/login', { username, password });
	return data;
};

const updateToken = async () => {
	const { data } = await $authHost.post('/auth/refresh-token');
	return data;
};

export { authUser, updateToken };
