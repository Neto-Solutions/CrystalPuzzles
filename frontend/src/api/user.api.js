import { $authHost, $host } from './';

export const authUser = async () => {
	const { data } = await $authHost.get('/');
	return data;
};

export const signInUser = async (user) => {
	const { data } = await $host.post('/', { ...user });
	return data;
};
export const signUpUser = async (user) => {
	const { data } = await $host.post('/', { ...user });
	return data;
};
