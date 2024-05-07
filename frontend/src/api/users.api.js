import { $authHost, $host } from '.';

const registerUser = async (user) => {
	const {
		email,
		password,
		firstname,
		lastname,
		surname,
		birthday,
		is_man,
		contact
	} = user;

	const { data } = await $host.post('/user/register', {
		email,
		password,
		firstname,
		lastname,
		surname,
		birthday,
		is_man,
		contact
	});
	return data;
};

const verifyEmail = async () => {
	const { data } = await $authHost.post('/user/verified');
	return data;
};

const changePassword = async (params) => {
	const { old_password, new_password } = params;
	const { data } = await $host.post('/user/change-password', {
		old_password,
		new_password
	});
	return data;
};

export { registerUser, verifyEmail, changePassword };
